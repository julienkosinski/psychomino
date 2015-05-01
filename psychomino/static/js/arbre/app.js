window.onload = function() {
	var trunk = new Trunk()
	trunk.parent = "tree";
	trunk.parentId = "tree";
	trunk.setId();
}

$(document).on('click', 'a.hide.truckHide', function() {
  $('.contentTrunk').toggle();
  $(this).parent().toggleClass("marginTruck");
});

$(document).on('click', 'a.hide.branchHide', function() {
  $(this).parent().next().toggle();
});

