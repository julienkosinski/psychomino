var Rasterizer = {

  // Settings
  spacingX: 6,
  spacingY: 6,
  baseRadius: 5,
  intensity: 1,

  invert: false,
  useUnderlyingColors: false,

  padding: 70,
  style: 'dots',


  // Other Globals
  points: [],

  canvas: null,
  context: null,

  imageInput: null,
  bgImage: null,
  bgCanvas: null,
  bgContext: null,

  init: function() {
    
    // Set up the visual canvas 
    this.canvas = document.getElementById( 'canvas' );
    this.context = canvas.getContext( '2d' );
    
    // Set the sizing of the canvas
    this.canvas.width = window.innerWidth - 100;
    this.canvas.height = window.innerHeight - 100;
    this.canvas.style.marginLeft = -this.canvas.width/2 + 'px';
    this.canvas.style.marginTop = -this.canvas.height/2 + 'px';
    this.canvas.style.display = 'block'

    // Show the canvas
    this.imageInput = document.createElement( 'input' );
    this.imageInput.setAttribute( 'type', 'file' );
    this.imageInput.style.visibility = 'hidden';
    this.imageInput.addEventListener('change', this.upload, false);
    document.body.appendChild( this.imageInput );
    
    window.onresize = function(event) {
      Rasterizer.onWindowResize();    
    }
  },

  /*
  *  Resizes the canvas to fit within the screen, based on a given image width/height
  */
  resizeCanvas: function( width, height ) {

    var newWidth, newHeight;

    var availableWidth = window.innerWidth - 100;
    var availableHeight = window.innerHeight - 100;

    // If the image is too big for the screen... scale it down.
    if ( width > availableWidth || height > availableHeight ) {

      var maxRatio = Math.max( width / availableWidth , height / availableHeight );
      newWidth = width / maxRatio;
      newHeight = height / maxRatio;

    } else {
      newWidth = width;
      newHeight = height;
    }

    this.canvas.width = newWidth;
    this.canvas.height = newHeight;
    this.canvas.style.marginLeft = -this.canvas.width/2 + 'px';
    this.canvas.style.marginTop = -this.canvas.height/2 + 'px';
  },

  // Gets the pixel data for a specific x/y and returns the colors
  getPixelData: function( x, y, width, height ){

    var pixels;
    if ( x === undefined ) {
      pixels = this.bgContext.getImageData( 0, 0, this.bgCanvas.width, this.bgCanvas.height );
    } else {
      pixels = this.bgContext.getImageData( x, y, width, height );
    }
    
    return pixels;
  },

  // Turn the background image to black and white, using .34, .5, .16 luminance.
  greyScaleImage: function() {

    var imageData = this.getPixelData();
    var data = imageData.data;


    for(var i = 0; i < data.length; i += 4) {
      
      var brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
      data[i] = brightness;
      data[i + 1] = brightness;
      data[i + 2] = brightness;
      
    }

    this.bgContext.putImageData( imageData, 0, 0 );

  },
  
  preparePoints: function() {

    this.points = [];
    
    var width, height, i, j;

    var pixelData = this.getPixelData();
    var colors = pixelData.data;

    for( i = this.spacingY / 2; i < this.canvas.height; i += this.spacingY ) {

      for ( j = this.spacingX / 2; j < this.canvas.width; j += this.spacingX ) {

        var pixelPosition = ( j + i * pixelData.width ) * 4;
        
        // We only need one color here... since they are all the same.
        var brightness = 0.34 * colors[pixelPosition] + 0.5 * colors[pixelPosition + 1] + 0.16 * colors[pixelPosition + 2];
        var baseRadius = this.calculateRadius( j, i, brightness );

        var color = 'rgba(' + colors[pixelPosition] + ',' + colors[pixelPosition + 1] + ',' + colors[pixelPosition + 2] + ',' + '1)';

        this.points.push( { x: j, y: i, radius: baseRadius, color: color } );

      }

    }
  },

  calculateRadius: function( x, y, color) {

    var radius;
    if ( this.invert ) {
      radius = Math.round( this.baseRadius * ( color / 255 ) );
    } else {
      radius = Math.round( this.baseRadius * (1 - ( color / 255 ) ) );
    }
    
    // Shrink radius at the edges, so it seems like we fade out into nothing.
    if ( x < this.padding ) {

      radius = Math.ceil( radius * ( x / this.padding ) );

    } else if ( x > this.bgCanvas.width - this.padding ) {

      radius = Math.ceil( radius * ( (this.bgCanvas.width - x) / this.padding ) );

    }

    if ( y < this.padding ) {

      radius = Math.ceil( radius * ( y / this.padding ) );
    
    } else if ( y > this.bgCanvas.height - this.padding ) {

      radius = Math.ceil( radius * ( (this.bgCanvas.height - y) / this.padding ) );

    }

    return radius * this.intensity;
  },

  drawPoints: function() {

    var i, currentPoint;

    this.context.fillStyle = '#000';
    this.context.strokeStyle = '#000';
    this.context.lineCap = 'round';

    if ( this.style === 'dots' || this.style === 'squares' ) {

      for ( i = 0; i < this.points.length; i++ ) {

        currentPoint = this.points[i];

        if ( this.useUnderlyingColors ) {
          this.context.fillStyle = currentPoint.color;
        }

        this.context.beginPath();
        
        if ( this.style === 'dots' ){
          this.context.arc(currentPoint.x, currentPoint.y, currentPoint.radius ,0 , Math.PI*2, true);
        } else {
          this.context.fillRect( currentPoint.x - currentPoint.radius, currentPoint.y - currentPoint.radius, currentPoint.radius * 2, currentPoint.radius * 2 );
        }
        
        this.context.closePath();
        this.context.fill();
      }

    } else if ( this.style === 'horizontal-lines' ) {

      var lastPoint = {x: 0, y: 0};

      for ( i = 0; i < this.points.length; i++ ) {

        currentPoint = this.points[i];

        if ( this.useUnderlyingColors ) {
          this.context.strokeStyle = currentPoint.color;
        }

        if ( currentPoint.y > lastPoint.y ) {
          this.context.moveTo( currentPoint.x, currentPoint.y );
          lastPoint = currentPoint;
          continue;
        } 

        this.context.lineWidth = currentPoint.radius * 1.1;
        this.context.beginPath();
        
        this.context.moveTo( lastPoint.x, lastPoint.y );
        this.context.lineTo( currentPoint.x, currentPoint.y );
        
        this.context.stroke();
        lastPoint = currentPoint;

      }

    } else if ( this.style === 'diagonal-lines' ) {

      for ( i = 0; i < this.points.length; i++ ) {

        currentPoint = this.points[i];

        if ( this.useUnderlyingColors ) {
          this.context.strokeStyle = currentPoint.color;
        }

        if ( currentPoint.y == 0 || currentPoint.x == 0 ) {
          continue;
        } 

        this.context.lineWidth = currentPoint.radius * 0.9;
        this.context.beginPath();
        
        this.context.moveTo( currentPoint.x - this.spacingX, currentPoint.y - this.spacingY );
        this.context.lineTo( currentPoint.x, currentPoint.y );
        
        this.context.stroke();
        lastPoint = currentPoint;

      }
    }
  },

  draw: function() {
    this.clear();
    this.preparePoints();
    this.drawPoints();
  },

  clear: function() {
    this.context.fillStyle = '#ffffff';
    this.context.beginPath();
    this.context.fillRect( 0, 0, this.canvas.width, this.canvas.height );
  },

  save: function() {
    window.open( this.canvas.toDataURL('image/png'), 'mywindow' );
  },

  uploadImage: function() {
    this.imageInput.click();
  },

  // User is uploading an image
  upload: function() {
    
    var fileReader = new FileReader();

    fileReader.onload = function( event ) {

      //this
      Rasterizer.loadData( event.target.result );
    }

    fileReader.readAsDataURL( this.files[0] );

  },

  // The filereader has loaded the image... add it to image object to be drawn
  loadData: function( data ) {
    
    this.bgImage = new Image;
    this.bgImage.src = data;

    this.bgImage.onload = function() {

      //this
      Rasterizer.drawImageToBackground();
    }
  },

  // Image is loaded... draw to bg canvas
  drawImageToBackground: function () {

    this.resizeCanvas( this.bgImage.width, this.bgImage.height );

    // Set up background canvas
    this.bgCanvas = document.createElement( 'canvas' );
    this.bgCanvas.width = this.canvas.width;//this.bgImage.width;
    this.bgCanvas.height = this.canvas.height//this.bgImage.height;

    // Draw to background canvas
    this.bgContext = this.bgCanvas.getContext( '2d' );
    this.bgContext.drawImage( this.bgImage, 0, 0, this.canvas.width, this.canvas.height );

    //this.context.drawImage( this.bgImage, 0, 0, this.canvas.width, this.canvas.height );
    // this.greyScaleImage();

    this.clear();

    this.preparePoints();
    this.drawPoints();

  },

  // Resize and redraw the canvas.
  onWindowResize: function() {
    this.drawImageToBackground();
  }

}