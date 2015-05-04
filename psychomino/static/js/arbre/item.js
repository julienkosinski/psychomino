var Item = function() {
	this.id = null;
	this.link = null;
	this.parent = null;
	this.elementParentId = null;
	this.elementParent;
	this.name = 'item';
	this.font = null;
	this.content = null;
	this.setLink = function() {
		var source = this.name + this.id;
		var target = this.elementParent;

		jsPlumb.makeSource(source, {
	    	connector: 'StateMachine',
	    	anchor: "TopCenter"
	  	});
	  	jsPlumb.makeTarget(target, {
		    anchor: "BottomCenter"
	  	});

		this.link = jsPlumb.connect(
			{
				source:source,
				target:target,
				paintStyle: {
			        strokeStyle: "#5b9ada",
			        lineWidth: 2
			    }
			}
		);

		jsPlumb.repaintEverything();
	};
	this.addDivNode = function() {

		var div = document.createElement('div');
		div.id = this.name + this.id;
		document.getElementById(this.parent).appendChild(div);
		this.setContent(this.content);
		this.addEvents(div);
	};
	this.addEvents = function(div) {
		var this2 = this;
		if(div.addEventListener) {
			div.addEventListener('dblclick', function() {
				var p = document.getElementById(this2.id + "content");
				var pText = p.innerHTML;
				div.removeChild(p);
				var inp = document.createElement("input");
				inp.type = "text";
				inp.value = pText;
				inp.id = "inpContent" + this2.id;
				inp.className = "valueInput";
				div.insertBefore(inp, div.firstChild);
				inp.focus();

				inp.addEventListener('blur', function() {

					var val = inp.value;
					var p2 = document.createElement('p');
					p2.innerHTML = val;
					p2.id = this2.id + "content";
					p2.className = "value";
					div.insertBefore(p2, div.firstChild);
					div.removeChild(inp);
					this2.sendUpdate(val);
				});
			});
		}
		else {
			div.attachEvent('ondblclick', function() {
				var p = document.getElementById(this2.id + "content");
				var pText = p.innerHTML;
				div.removeChild(p);
				var inp = document.createElement("input");
				inp.type = "text";
				inp.value = pText;
				inp.id = "inpContent";
				inp.className = "valueInput";
				div.insertBefore(inp, div.firstChild);
				inp.focus();
				inp.addEvent('onblur', function() {
					var val = inp.value;
					var p2 = document.createElement('p');
					p2.innerHTML = val;
					p2.id = this2.id + "content";
					p2.className = "value";
					div.insertBefore(p2, div.firstChild);
					div.removeChild(inp);
					this2.sendUpdate(val);
				});
			});
		}
	};

	this.addDivChildren = function() {

		var div = document.createElement('div');
		div.id = 'content' + this.name + this.id;
		div.className = "content" + this.name;
		document.getElementById(this.parent).appendChild(div);
	};
	this.setFont = function(font) {

		this.font = font;

	};
	this.deleteItem = function() {

		//Requete AJAX

		this.removeLink();

		delete this;

	};
	this.removeLink = function() {

		jsPlumb.remove(this.id);

	};
	this.setContent = function(text) {
		this.content = text;
		var p = document.createElement('p');
		p.innerHTML = text;
		p.id = this.id + "content";
		p.className = "value";
		document.getElementById(this.name + this.id).appendChild(p);
	};
	this.getXMLHttpRequest = function() {
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
		
		return xhr;
	};
	this.sendUpdate = function(text) {
	};
};