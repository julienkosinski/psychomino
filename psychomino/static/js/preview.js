var app = {

	init: function($){
		app.initFreewall($);
		app.initFontSize($);
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
			var maxHeight = 300;
			var textHeight = $(this).height();
			var ratio = textHeight / maxHeight;
			if((textHeight / maxHeight) >= 1){
				var newFontSize = 15 /ratio;
				$(this).css('font-size', newFontSize + 'px');

				if(newFontSize < 11){
					$(this).css('font-size', 11 + 'px');
				}
			}
		});
	}
}


jQuery(document).ready(function($){
	app.init($);
});