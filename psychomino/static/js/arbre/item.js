var Item = function() {
	this.id = null;
	this.parent = null;
	this.parentId = null;
	this.name = 'item';
	this.font = null;
	this.content = null;
	this.setLink = function() {
		console.log(this.id);
		console.log(this.parent);
		var source = this.name + this.id;
		var target = this.parent
		jsPlumb.connect(
			{
				source:source,
				target:target
			}
		);
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
				inp.id = "inpContent";
				div.appendChild(inp);
				inp.focus();

				inp.addEventListener('blur', function() {

					var val = inp.value;
					var p2 = document.createElement('p');
					p2.innerHTML = val;
					p2.id = this2.id + "content";
					div.appendChild(p2);
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
				div.appendChild(inp);
				inp.focus();
				inp.addEvent('onblur', function() {
					var val = inp.value;
					var p2 = document.createElement('p');
					p2.innerHTML = val;
					p2.id = this2.id + "content";
					div.appendChild(p2);
					div.removeChild(inp);
					this2.sendUpdate(val);
				});
			});
		}
	};

	this.addDivChildren = function() {

		var div = document.createElement('div');
		div.id = 'content' + this.name + this.id;
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

		var p = document.createElement('p');
		p.innerHTML = text;
		p.id = this.id + "content";
		console.log(this.name + this.id);
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