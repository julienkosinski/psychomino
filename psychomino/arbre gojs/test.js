function init() {

	var $ = go.GraphObject.make;

	var diagram =
	   	$(go.Diagram, "myDiagramDiv",
	    {
	       	initialContentAlignment: go.Spot.Center,
	       	allowZoom: true,
	       	allowCopy: false,
	       	allowDelete: false,
	       	"grid.visible": true,  // display a background grid for the whole diagram
	       	// mouse wheel zooms instead of scrolls
	       	"toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom,
	       	layout: $(go.TreeLayout,
	            { angle: 45, sorting: go.TreeLayout.SortingAscending })
	    });

	myDiagram.nodeTemplate =
      $(go.Node, "Auto",
        { doubleClick: nodeDoubleClick },
        { // handle dragging a Node onto a Node to (maybe) change the reporting relationship
          mouseDragEnter: function (e, node, prev) {
            var diagram = node.diagram;
            var selnode = diagram.selection.first();
            if (!mayWorkFor(selnode, node)) return;
            var shape = node.findObject("SHAPE");
            if (shape) {
              shape._prevFill = shape.fill;  // remember the original brush
              shape.fill = "darkred";
            }
          },
          mouseDragLeave: function (e, node, next) {
            var shape = node.findObject("SHAPE");
            if (shape && shape._prevFill) {
              shape.fill = shape._prevFill;  // restore the original brush
            }
          },
          mouseDrop: function (e, node) {
            var diagram = node.diagram;
            var selnode = diagram.selection.first();  // assume just one Node in selection
            if (mayWorkFor(selnode, node)) {
              // find any existing link into the selected node
              var link = selnode.findTreeParentLink();
              if (link !== null) {  // reconnect any existing link
                link.fromNode = node;
              } else {  // else create a new link
                diagram.toolManager.linkingTool.insertLink(node, node.port, selnode, selnode.port);
              }
            }
          }
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
          $(go.Picture,
            {
              maxSize: new go.Size(39, 50),
              margin: new go.Margin(6, 8, 6, 10),
            },
            new go.Binding("source", "key", findHeadShot)),
          // define the panel where the text will appear
          $(go.Panel, "Table",
            {
              maxSize: new go.Size(150, 999),
              margin: new go.Margin(6, 10, 0, 3),
              defaultAlignment: go.Spot.Left
            },
            $(go.RowColumnDefinition, { column: 2, width: 4 }),
            $(go.TextBlock, textStyle(),  // the name
              {
                row: 0, column: 0, columnSpan: 5,
                font: "12pt Segoe UI,sans-serif",
                editable: true, isMultiline: false,
                minSize: new go.Size(10, 16)
              },
              new go.Binding("text", "name").makeTwoWay()),
            $(go.TextBlock, "Title: ", textStyle(),
              { row: 1, column: 0 }),
            $(go.TextBlock, textStyle(),
              {
                row: 1, column: 1, columnSpan: 4,
                editable: true, isMultiline: false,
                minSize: new go.Size(10, 14),
                margin: new go.Margin(0, 0, 0, 3)
              },
              new go.Binding("text", "title").makeTwoWay()),
            $(go.TextBlock, textStyle(),
              { row: 2, column: 0 },
              new go.Binding("text", "key", function(v) {return "ID: " + v;})),
            $(go.TextBlock, textStyle(),
              { row: 2, column: 3, },
              new go.Binding("text", "parent", function(v) {return "Boss: " + v;})),
            $(go.TextBlock, textStyle(),  // the comments
              {
                row: 3, column: 0, columnSpan: 5,
                font: "italic 9pt sans-serif",
                wrap: go.TextBlock.WrapFit,
                editable: true,  // by default newlines are allowed
                minSize: new go.Size(10, 14)
              },
              new go.Binding("text", "comments").makeTwoWay())
          )  // end Table Panel
        ) // end Horizontal Panel
      );  // end Node
	
}

function nodeDoubleClick(e, obj) {
	var clicked = obj.part;
	if (clicked !== null) {
		var thisemp = clicked.data;
		myDiagram.startTransaction("add element");
		var nextkey = (myDiagram.model.nodeDataArray.length + 1).toString();
		var newemp = { key: nextkey, name: "(new person)", title: "", parent: thisemp.key };
		myDiagram.model.addNodeData(newemp);
		myDiagram.commitTransaction("add element");
	}
}