window.onload = function() {


  var tabStr = location.href.split('/');
  if(tabStr.length == 4)
  {
    var trunk = new Trunk()
    trunk.parent = "tree";
    trunk.parentId = "tree";
    trunk.setId();
    document.getElementById('tree').addEventListener("scroll", function(){
      jsPlumb.repaintEverything();
    });

    $(".image").colorbox({iframe:true, width:"50%", height:"70%"});
    
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
        $(this).parent().find('.after').show();
      }
    });

    $('a.choice').on('click', function(){
      $(this).hide();
      $(this).parent().find('.before').hide();
      $(this).parent().find('.after').hide();
    });
  }
  else if(tabStr.length == 5)
  {
    var lessonId = tabStr[4];

    var xhr = this.getXMLHttpRequest();
    xhr.open("GET", "http://" + location.host + "/lessons/" + lessonId, true);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.send();
    xhr.onreadystatechange = function() {
      if(xhr.readyState == 4) {
        if(xhr.status == 200) {
          var response = xhr.responseText;
          var trunk = new Trunk()
          trunk.parent = "tree";
          trunk.parentId = "tree";
          trunk.id = lessonId;
          trunk.content = response.lesson_title;
          trunk.addDivNode();
          trunk.addDivChildren();
          trunk.addButtons();
          trunk.addEventButtons();
          trunk.setClass();

          for (var i = 0; i < response.branches.length; i++) {
            response.branches[i]
          };
        }
        else {
          alert('Impossible de récupérer la leçon !');
        }
      }
    };
  }
}