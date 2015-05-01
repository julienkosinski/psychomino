window.onload = function() {
	var trunk = new Trunk()
	trunk.parent = "tree";
	trunk.parentId = "tree";
	trunk.setId();
}
$('a.show.branchHide').hide();

$(document).on('click', 'a.hide.branchHide', function() {
  $(this).parent().next().css('display', 'none');
  $(this).hide();
  $(this).next().show();
});

$(document).on('click', 'a.show.branchHide', function() {
  $(this).parent().next().css('display', 'block');
  $(this).hide();
  $(this).prev().show();
});
