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

  $('.after').on('click', function(){
    $left =  $(this).parent().find('.slide').css('left');
    $left = 'calc('+$left+' - 204px)';
    $(this).parent().find('.slide').css('left', $left);

    if($(this).parent().find('.slide').css('left') == '-204px'){
      $(this).parent().find('.before').show();
    }
    if($(this).parent().find('.slide').css('left') == '-408px'){
      $(this).hide();
    }
  });

  $('.before').on('click', function(){
    $left =  $(this).parent().find('.slide').css('left');
    $left = 'calc('+$left+' + 204px)';
    $(this).parent().find('.slide').css('left', $left);
    if($(this).parent().find('.slide').css('left') == '0px'){
      $(this).hide();
    }
    if($(this).parent().find('.slide').css('left') == '-204px'){
      $('.after').show();
    }
  });

  $('a.choice').on('click', function(){
    $(this).hide();
    $(this).parent().find('.before').hide();
    $(this).parent().find('.after').hide();
  });
}