window.onload = function() {


  var tabStr = location.href.split('/');
  if(!(/^[0-9]+$/.test(tabStr[3])))
  {
    console.log("ok");
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
  else
  {
    var lessonId = tabStr[3];

    var xhr = null;
    
    if (window.XMLHttpRequest || window.ActiveXObject) {
      if (window.ActiveXObject) {
        try {
          xhr = new ActiveXObject("Msxml2.XMLHTTP");
        } catch(e) {
          xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
      } else {
        xhr = new XMLHttpRequest(); 
      }
    } else {
      alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
      return null;
    }
    xhr.open("GET", "http://" + location.host + "/lessons/" + lessonId, true);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.send();
    xhr.onreadystatechange = function() {
      if(xhr.readyState == 4) {
        if(xhr.status == 200) {
          var response = JSON.parse(xhr.responseText);
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
            trunk.numBranch += 1;
            var grow = document.createElement('div');
            grow.className = "grow";
            grow.id = "grow" + trunk.numBranch;
            document.getElementById("contentTrunk" + trunk.id).appendChild(grow);
            var branch = new Branch();
            branch.parent = "grow" + trunk.numBranch;
            branch.elementParentId = trunk.id;
            branch.elementParent = trunk.name + trunk.id;
            branch.id = response.branches[i].id;
            branch.content = response.branches[i].branch_title;

            branch.addDivNode();
            branch.addDivChildren();
            branch.addButtons();
            branch.addEventsButtons();
            branch.setClass();
            branch.setLink();
            jsPlumb.repaintEverything();

            for (var j = 0; j < response.branches[i].elements.length; j++) {
              var element = new Element();
              element.parent = 'content' + branch.name + branch.id;
              element.name = "Element";
              element.elementParentId = branch.id;
              element.elementParent = branch.name + branch.id;
              element.id = response.branches[i].elements[j].id;
              element.content = response.branches[i].elements[j].element_content;

              var div = document.createElement('div');
              div.className = "elementType";
              var div2 = document.createElement('div');
              div2.id = element.name + element.id;
              div2.className = "element";
              div.appendChild(div2);
              var a = document.createElement('a');
              a.href = "#";
              a.innerHTML = "x";
              a.id = "deleteButton" + element.id;
              a.className = "btn delete item";
              div2.appendChild(a);
              document.getElementById(element.parent).appendChild(div);
              if(response.branches[i].elements[j].element_type == "TXT")
              {
                var p = document.createElement('p');
                p.innerHTML = element.content;
                p.id = element.id + "content";
                element.type = "PetitTexte";
                p.className = "value petitTexte";
                document.getElementById(element.name + element.id).appendChild(p);
              }
              else if(response.branches[i].elements[j].element_type == "TEXT")
              {
                var p = document.createElement('p');
                p.innerHTML = element.content;
                p.id = element.id + "content";
                element.type = "GrandTexte";
                p.className = "value grandTexte";
                document.getElementById(element.name + element.id).appendChild(p);
              }
              var d = document.getElementById("deleteButton" + element.id);
              d.addEventListener('click', function() {
                jsPlumb.detachAllConnections(d.parentNode);
                d.parentNode.parentNode.parentNode.removeChild(d.parentNode.parentNode);
                jsPlumb.repaintEverything();
                var xhr = element.getXMLHttpRequest();
                xhr.open("DELETE", "http://" + location.host + "/elements/" + element.id, true);
                xhr.setRequestHeader('Accept', 'application/json');
                xhr.send();
                xhr.onreadystatechange = function() {
                  if(xhr.readyState == 4) {
                    if(xhr.status != 204) {
                      alert('Impossible de supprimer l\'element !');
                    }
                  }
                };
              });

              element.addEvents(document.getElementById(element.name + element.id));
              element.setLink();
            };
          };
        }
        else {
          alert('Impossible de récupérer la leçon !');
        }
      }
    };
  }
}