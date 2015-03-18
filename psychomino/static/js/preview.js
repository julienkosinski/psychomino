var app = {

	init: function($){
		app.initFreewall($);
		app.initFontSize($);
		app.initCanvasSvg($);
	},

	initFreewall: function($){
		var wall = new freewall("#freewall");
		wall.reset({
			selector: '.cell',
			cellW: 'auto',
			cellH: 'auto',
			onResize: function() {
				wall.refresh();
			}
		});
		wall.fitWidth();
		// for scroll bar appear;
		$(window).trigger("resize");
	},

	initFontSize: function($){
		/* Change font size to fit container */
		$('#freewall .cell .cover .handle').each(function(){
			var maxHeight = 500;
			var textHeight = $(this).height();
			var ratio = textHeight / maxHeight;
			if((textHeight / maxHeight) >= 1){
				var newFontSize = 14 /ratio;
				$(this).css('font-size', newFontSize + 'px');

				if(newFontSize < 14){
					$(this).css('font-size', 14 + 'px');
				}
			}
		});
	},

	initCanvasSvg: function($){
        html2canvas(document).then(function(canvas) {
            document.body.appendChild(canvas);
        });
	}
}


jQuery(document).ready(function($){
	app.init($);
});