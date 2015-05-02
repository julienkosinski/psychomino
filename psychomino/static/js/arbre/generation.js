var svgConstArray = {width: 600, height: 400};
var pdfConstArray = {width: 297, height: 210};
var svgNS = "http://www.w3.org/2000/svg"; 
var	svgId = 0;

var branchesConstArray = {width: 45, height: 18};
var imagesConstArray = {width: 45, height: 45};
var longTextConstArray = {width: 58, height: 45};
var shortTextConstArray = {width: 18, height: 18};

var	svgX = 0;
var	svgY = 0;

var container = document.createElement('div');
container.setAttribute('id', 'svg-all');
/*container.style.visibility = 'hidden';
container.style.overflow = 'hidden';
container.style.height = '0px';*/
document.body.appendChild(container);


var svg = document.createElementNS(svgNS, "svg");

$('.generate button').on('click', function(){
	generateDocuments($(this).val());
})

function getAllElementsValue(className){
	var elements = new Array(); 
	$(className).each(function(index){
		elements[elements.length] = $(this).text();
	});
	return elements;
}

function generateDocuments(documentType){
	if(documentType=='svg'){
		fileW = svgConstArray['width'];
		fileH = svgConstArray['height'];
	}
	else if(documentType == 'pdf'){
		fileW = pdfConstArray['width'];
		fileH = pdfConstArray['height'];
	}

	svg.setAttribute('id', 'svg-'+svgId);
	svg.setAttribute('width', fileW+'mm');
	svg.setAttribute('height', fileH+'mm');

	branches = getAllElementsValue('.branch .value');
	branchH = branchesConstArray['height'];
	branchW = branchesConstArray['width'];

	if(branches.length <= 0){
		throw new Error("Please insert at least one branch!");
	}

	generateBlocs(branches, fileW, fileH, branchW, branchH);

	images = getAllElementsValue('.elementImage .value');
	//images2 = $('.elementImage .value [href]');
	//console.log(images2);

	if(images.length > 0){

		imgH = imagesConstArray['height'];
		imgW = imagesConstArray['width'];
		generateBlocs(images, fileW, fileH, imgW, imgH);
		
	}

	longTexts = getAllElementsValue('.elementLongText .value');
	if(longTexts.length > 0){

		longTextH = longTextConstArray['height'];
		longTextW = longTextConstArray['width'];
		generateBlocs(longTexts, fileW, fileH, longTextW, longTextH);

	}

	littleTexts = getAllElementsValue('.elementLittletext .value');
	if(littleTexts.length > 0){

		littleTextH = shortTextConstArray['height'];
		littleTextW = shortTextConstArray['width'];
		generateBlocs(littleTexts, fileW, fileH, littleTextW, littleTextH);
		
	}
	if(svg.children.length > 0){
		document.getElementById("svg-all").appendChild(svg);
		mergeTextWithRect();
		sendPlainSvgToBackend();
	}
}

function testPlacementBloc(fileW, fileH, elemW, elemH)
{
	if(svgX + elemW >= fileW){
		svgX = 0;
		if(svgY + elemH + elemH >= fileH){
			svgY = 0;
			return false;
		}
		else{
			svgY = svgY + elemH;
		}
	}
	return true;
}

function resetPosition(elem)
{
	if(svgX == 0){
		if(svgY != 0){
			svgY = svgY + elem;
		}
	}
	else{
		svgX = 0;
		svgY = svgY + elem;
	}
}

function generateBlocs(contents, fileW, fileH, elemW, elemH)
{
	//console.log(contents);
	contents.forEach(function(content){
		if(testPlacementBloc(fileW, fileH, elemW, elemH) == false){
			document.getElementById("svg-all").appendChild(svg);
			svgId = svgId + 1;
			console.log(svgId);

			svg = document.createElementNS(svgNS, "svg");
			svg.setAttribute('id', 'svg-'+svgId);
			svg.setAttribute('width', fileW+'mm');
			svg.setAttribute('height', fileH+'mm');

		}
		svg.innerHTML +=
			'<rect class="shape" height="'+elemH+'mm" width="'+elemW+'mm" y="'+svgY+'mm" x="'+svgX+'mm" stroke="red" fill="white"></rect>'+
			'<text class="wrap contentSvg" y="'+svgY+'mm" x="'+svgX+'mm" font-size="12">'+
			content+
			'</text>';

		svgX = svgX + elemW;
	});
	resetPosition(elemH);
}

function mergeTextWithRect()
{
	// !!!!!!!!!!!!!
	// DOES NOT WORK, WHY ???!!!
	
	d3plus.textwrap()
					.container(d3.select(".contentSvg"))
					.resize(true)
					.draw();
	// !!!!!!!!!!!!!
}

function sendPlainSvgToBackend()
{
	// Does not wrap <svg> tag... :'(.
	// Need to create another div if we want to do so. Else, send all svg in one block an manage it server side.
	var allSvgTemp = document.getElementsByTagName("svg");
	allSvgTemp = Array.prototype.slice.call(allSvgTemp);
	var svgAll = [];
	allSvgTemp.forEach(function(aSvg,index){
		svgAll.push(aSvg.innerHTML);
	});
	console.log(svgAll);
	
	var csrftoken = getCookie('csrftoken');
	
	$.ajaxSetup({
	    beforeSend: function(xhr, settings) {
	        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
	            xhr.setRequestHeader("X-CSRFToken", csrftoken);
	        }
	    }
	});

	// !!! Will need a limit of datas to prevent from problems... !!!
	$.ajax({
		url: "getSvg/",
		method: "POST",
		data: { svgAll : svgAll }
	});
	//allSvgString.outerHTML = "";
	//delete allSvgString;
}

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
