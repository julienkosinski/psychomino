function init() {

  if (window.goSamples) goSamples();  // init for these samples -- you don't need to call this
  var $ = go.GraphObject.make;  // for conciseness in defining templates
  myDiagram =
  $(go.Diagram, "diagram", // must be the ID or reference to div
  {
    initialContentAlignment: go.Spot.Center,
    // make sure users can only create trees
    validCycle: go.Diagram.CycleDestinationTree,
    // users can select only one part at a time
    maxSelectionCount: 1,
    layout:
    $(go.TreeLayout,
    {
      treeStyle: go.TreeLayout.StyleLastParents,
      arrangement: go.TreeLayout.ArrangementHorizontal,
      // properties for most of the tree:
      angle: 90,
      layerSpacing: 35,
      // properties for the "last parents":
      alternateAngle: 90,
      alternateLayerSpacing: 35,
      alternateAlignment: go.TreeLayout.AlignmentBus,
      alternateNodeSpacing: 20
    }),
      // support editing the properties of the selected person in HTML
      //"TextEdited": onTextEdited,
      // enable undo & redo
      "undoManager.isEnabled": true
  });

  var div = document.getElementById('diagram');

  div.addEventListener("dragover", function(e) {
    e.preventDefault();
  }, false);

  div.addEventListener("drop", function(event) {


    event.preventDefault();
    // prevent default action
    // (open as link for some elements in some browsers)
    // Dragging onto a Diagram
    var files = event.dataTransfer.files;
    upload(files, this, 0);
    // If we were using drag data, we could get it here, ie:
    // var data = event.dataTransfer.getData('text');
  }, false);


  // when the document is modified, add a "*" to the title and enable the "Save" button
  myDiagram.addDiagramListener("SelectionDeleting", function(e) {
    var data = myDiagram.selection.first().data;
    ajaxDjango("element_content=" + data.name + "&element_type=TEXT" + "&element_branch=" + data.parent);
  });

  myDiagram.addDiagramListener("Modified", function(e) {

  });
  var levelColors = ["#AC193D/#BF1E4B", "#2672EC/#2E8DEF", "#8C0095/#A700AE", "#5133AB/#643EBF",
                     "#008299/#00A0B1", "#D24726/#DC572E", "#008A00/#00A600", "#094AB2/#0A5BC4"];
  // override TreeLayout.commitNodes to also modify the background brush based on the tree depth level
  myDiagram.layout.commitNodes = function() {
    go.TreeLayout.prototype.commitNodes.call(myDiagram.layout);  // do the standard behavior
    // then go through all of the vertexes and set their corresponding node's Shape.fill
    // to a brush dependent on the TreeVertex.level value
    myDiagram.layout.network.vertexes.each(function(v) {
      if (v.node) {
        var level = v.level % (levelColors.length);
        var colors = levelColors[level].split("/");
        var shape = v.node.findObject("SHAPE");
        if (shape) shape.fill = $(go.Brush, go.Brush.Linear, { 0: colors[0], 1: colors[1], start: go.Spot.Left, end: go.Spot.Right });
      }
    });
  }
  
  // this is used to determine feedback during drags
  function mayWorkFor(node1, node2) {
    if (!(node1 instanceof go.Node)) return false;  // must be a Node
    if (node1 === node2) return false;  // cannot work for yourself
    if (node2.isInTreeOf(node1)) return false;  // cannot work for someone who works for you
    return true;
  }
  // This function provides a common style for most of the TextBlocks.
  // Some of these values may be overridden in a particular TextBlock.
  function textStyle() {
    return { font: "9pt  Segoe UI,sans-serif", stroke: "white" };
  }
  // define the Node template
  myDiagram.nodeTemplate =
    $(go.Node, "Auto",
      { doubleClick: nodeDoubleClick },
      { mouseDragLeave: function (e, node, next) {
          var shape = node.findObject("SHAPE");
          if (shape && shape._prevFill) {
            shape.fill = shape._prevFill;  // restore the original brush
          }
        },
      },
      // for sorting, have the Node.text be the data.name
      new go.Binding("text", "name"),
      // bind the Part.layerName to control the Node's layer depending on whether it isSelected
      new go.Binding("layerName", "isSelected", function(sel) { return sel ? "Foreground" : ""; }).ofObject(),
      // define the node's outer shape
      $(go.Shape, "Rectangle",
        {
          name: "SHAPE", fill: "white", stroke: null,
          // set the port properties:
          portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer"
        }),
      $(go.Panel, "Horizontal",
        // define the panel where the text will appear
        $(go.Panel, "Table",
          {
            maxSize: new go.Size(150, 999),
            margin: new go.Margin(6, 10, 0, 3),
            defaultAlignment: go.Spot.Left
          },
          $(go.Picture,
          {
            width: 60, 
            height: 80,
            imageStretch: go.GraphObject.Uniform
          },
          new go.Binding("source", "img")),
          $(go.RowColumnDefinition, { column: 2, width: 4 }),
          $(go.TextBlock, textStyle(),  // the name
            {
              row: 0, column: 0, columnSpan: 5,
              font: "12pt Segoe UI,sans-serif",
              editable: true, isMultiline: false,
              minSize: new go.Size(10, 16)
            },
            new go.Binding("text", "name").makeTwoWay()),
          $(go.TextBlock, textStyle(),
            { row: 2, column: 0 }),
          $(go.TextBlock, textStyle(),
            { row: 2, column: 3, })
        )  // end Table Panel
      ) // end Horizontal Panel
    );  // end Node
  // define the Link template
  myDiagram.linkTemplate =
    $(go.Link, go.Link.Orthogonal,
      { corner: 5, relinkableFrom: true, relinkableTo: true },
      $(go.Shape, { strokeWidth: 4, stroke: "#00a4a4" }));  // the link shape
  // read in the JSON-format data from the "mySavedModel" element
  load();
}
  // Allow the user to edit text when a single node is selected
  /*function onSelectionChanged(e) {
    var node = e.diagram.selection.first();
    if (node instanceof go.Node) {
      updateProperties(node.data);
    } else {
      updateProperties(null);
    }
  }*/
  // Update the HTML elements for editing the properties of the currently selected node, if any
  /*function updateProperties(data) {
    if (data === null) {
      document.getElementById("propertiesPanel").style.display = "none";
      document.getElementById("name").value = "";
      document.getElementById("title").value = "";
      document.getElementById("comments").value = "";
    } else {
      document.getElementById("name").value = data.name || "";
      document.getElementById("title").value = data.title || "";
      document.getElementById("comments").value = data.comments || "";
    }
  }*/
  // This is called when the user has finished inline text-editing
  /*function onTextEdited(e) {
    var tb = e.subject;
    if (tb === null || !tb.name) return;
    var node = tb.part;
    if (node instanceof go.Node) {
      updateProperties(node.data);
    }
  }*/
  // Update the data fields when the text is changed
function updateData(text, field) {
  var node = myDiagram.selection.first();
  // maxSelectionCount = 1, so there can only be one Part in this collection
  var data = node.data;
  if (node instanceof go.Node && data !== null) {
    var model = myDiagram.model;
    model.startTransaction("modified " + field);
    if (field === "name") {
      model.setDataProperty(data, "name", text);
    } else if (field === "title") {
      model.setDataProperty(data, "title", text);
    }
    model.commitTransaction("modified " + field);
  }
}
// Show the diagram's model in JSON format
function save() {
  document.getElementById("testText").value = myDiagram.model.toJson();
  myDiagram.isModified = false;
}

function load() {
  myDiagram.model = go.Model.fromJson(document.getElementById("testText").value);
}

function ajaxDjangoImg(file, parent, method) {
  var type = file.type;

  if(type === "image/jpeg" || type === "image/png" || type === "image/gif")
  {
    var fd = new FormData();
    fd.append("element_content", file);
    fd.append("element_type", "IMG");
    fd.append("element_branch", parent);

    var ajax = new XMLHttpRequest();
    ajax.open(method,'http://localhost:8000/elements',true)
    ajax.onreadystatechange = function() {
      if(ajax.readystate == 4 && (ajax.status == 200 || ajax.status == 201 || ajax.status == 204)) {
        return req.responseText.id;
      }
      return false;
    }
    ajax.send(fd);
  }
}

function ajaxDjango(params, link, method) {
  var ajax = new XMLHttpRequest();
  ajax.open(method,'http://localhost:8000/' + link,true)
  ajax.setRequestHeader('content-type', 'application/x-www-urlencoded');
  ajax.setRequestHeader('content-length', params.length);
  ajax.setRequestHeader('connection', 'close');
  ajax.onreadystatechange = function() {
    if(ajax.readystate == 4 && ajax.status == 200) {
      return req.responseText.id;
    }
  }
  ajax.send(params);
}

function createNodeFull(type, content, parent) {
  var id = null;
  if(type == 'lesson') {
    if(id = ajaxDjango('lesson_title=' + content, 'lessons', 'post')) {
      createNode(id, content, parent);
    }
  }
  else if(type == 'branch') {
    if(id = ajaxDjango('branch_title=' + content + '&branch_lesson=' + parent, 'branches', 'post')) {
      createNode(id, content, parent);
    }

  }
  else if(type == 'elementTxt') {
    if(id = ajaxDjango('element_type=TEXT&element_content=' + content + '&element_branch=' + parent, 'elements', 'post')) {
      createNode(id, content, parent);
    }
  }
  else if(type == 'elementImg') {
    if(id = ajaxDjangoImg(content, parent, 'post')) {
      createNodeImg(id, content.fileName, parent);
    }
  }
}

function createNode(id, content, parent) {

  myDiagram.startTransaction("ajout d'un element");
  var nextkey = (myDiagram.model.nodeDataArray.length + 1).toString();
  var newemp = { key: id, name: content, parent: parent };
  myDiagram.model.addNodeData(newemp);
  myDiagram.commitTransaction("ajout d'un element");
}

function createNodeImg(id, content, parent) {

  myDiagram.startTransaction("ajout d'un element");
  var nextkey = (myDiagram.model.nodeDataArray.length + 1).toString();
  var newemp = { key: nextkey, img: "lien" + content, parent: thisemp.key };
  myDiagram.model.addNodeData(newemp);
  myDiagram.commitTransaction("ajout d'un element");
}

function testParent(parent, nodes) {
  if(parent == null) {
    return false;
  }
  else {
    return nodes.find(function (e, index, a) {
      if(e.key == parent) {
        return e;
      }
      else {
        return false;
      }
    });
  }
}

function testGrandParent(parent, nodes) {
  return nodes.find(function (e, index, a) {
    if(e.key == parent) {
      return e.parent;
    }
    else {
      return false;
    }
  });
}

function nodeDoubleClick(e, obj) {

  if (!Array.prototype.find) {
    Array.prototype.find = function(predicate) {
      if (this == null) {
        throw new TypeError('Array.prototype.find a été appelé sur null ou undefined');
      }
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate doit être une fonction');
      }
      var list = Object(this);
      var length = list.length >>> 0;
      var thisArg = arguments[1];
      var value;

      for (var i = 0; i < length; i++) {
        value = list[i];
        if (predicate.call(thisArg, value, i, list)) {
          return value;
        }
      }
      return undefined;
    };
  }

  var datatClicked = obj.part.data;
  var nodeArray = myDiagram.model.nodeDataArray;
  if(testParent(datatClicked.parent, nodeArray)) {
    if(!testGrandParent(datatClicked.parent, nodeArray)) {
      createNodeFull('elementTxt', 'Nouvel element', datatClicked.id);
    }
  }
  else {
    createNodeFull('branch', 'Nouvelle branche', datatClicked.id);
  }
}