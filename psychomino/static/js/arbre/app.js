window.onload = function() {
	var trunk = new Trunk()
	trunk.parent = "tree";
	trunk.parentId = "tree";
	trunk.setId();
	document.getElementById('tree').addEventListener("scroll", function(){
		jsPlumb.repaintEverything();
	});
  $('a.show.branchHide').hide();
   
   $(document).on('click', 'a.hide.branchHide', function() {
    $(this).parent().next().toggle();
    $(this).parent().next().css('display', 'none');
    $(this).hide();
    $(this).next().show();
    jsPlumb.repaintEverything();
  });
   
  $(document).on('click', 'a.show.branchHide', function() {
    $(this).parent().next().css('display', 'block');
    $(this).hide();
    $(this).prev().show();
    jsPlumb.repaintEverything();
  });
}