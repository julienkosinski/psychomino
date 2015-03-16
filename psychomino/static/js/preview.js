$(document).ready(function() {
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
});