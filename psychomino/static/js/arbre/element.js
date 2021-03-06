var Element = function() {
	var elementThis = this;
	Item.call(this);
	this.name = "Element";
	this.content = "Nouvel élément";
	this.type = null;
	this.setId = function() {
		var formData = new FormData();
		formData.append('element_content','Nouvelle element');
		formData.append('element_type','TEXT');
		formData.append('element_branch', this.elementParentId);
		var xhr = this.getXMLHttpRequest();
		xhr.open("POST", "http://" + location.host + "/elements", true);
		xhr.setRequestHeader('Accept', 'application/json');
		xhr.send(formData);
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4) {
				if(xhr.status == 201) {
					var data = JSON.parse(xhr.responseText);
					elementThis.id = data.id;
					elementThis.callback();
				}
				else {
					alert('Impossible de créer un element !');
				}
			}
		}
	};
	this.addDivNode = function() {

		var div = document.createElement('div');
		div.className = "elementType";
		var span1 = document.createElement('span');
		span1.id = "left" + this.id;
		span1.className = "before";
		div.appendChild(span1);
		var img1 = document.createElement('img');
		img1.src = "static/img/left.png";
		img1.alt = "left";
		span1.appendChild(img1);
		var div2 = document.createElement('div');
		div2.id = this.name + this.id;
		div2.className = "element";
		div.appendChild(div2);
		var a = document.createElement('a');
		a.href = "#";
		a.innerHTML = "x";
		a.id = "deleteButton" + this.id;
		a.className = "btn delete item";
		div2.appendChild(a);
		var span2 = document.createElement('span');
		span2.id = "right" + this.id;
		span2.className = "after";
		div.appendChild(span2);
		var img2 = document.createElement('img');
		img2.src = "static/img/right.png";
		img2.alt = "right";
		span2.appendChild(img2);
		var br = document.createElement('br');
		div.appendChild(br);
		var a2 = document.createElement('a');
		a2.className = "btn choice";
		a2.id = "validate" + this.id;
		a2.innerHTML = "Valider";
		div.appendChild(a2);

		document.getElementById(this.parent).appendChild(div);
		this.setContent('Image');
		this.type = "Image";
	};
	this.callback = function() {
		this.addDivNode();
		this.addEventsButtons();
		this.setLink();
	};
	this.sendUpdate = function(text) {
		var formData = new FormData();
		formData.append('element_content',text);
		if(this.type == "GrandTexte")
		{
			formData.append('element_type','TEXT');
		}
		else if(this.type == "PetitTexte")
		{
			formData.append('element_type','TXT');
		}
		formData.append('element_branch', this.elementParentId);
		var xhr = this.getXMLHttpRequest();
		xhr.open("PUT", "http://" + location.host + "/elements/" + this.id, true);
		xhr.setRequestHeader('Accept', 'application/json');
		xhr.send(formData);
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4) {
				if(xhr.status != 200) {
					alert('Impossible de créer un element !');
				}
			}
		}
	};
	this.addEventsDelete = function() {
		var this2 = this;
		var d = document.getElementById("deleteButton" + this.id);
		d.addEventListener('click', function(e) {
			e.preventDefault();
			jsPlumb.detachAllConnections(d.parentNode);
			d.parentNode.parentNode.parentNode.removeChild(d.parentNode.parentNode);
			jsPlumb.repaintEverything();
			var xhr = this2.getXMLHttpRequest();
			xhr.open("DELETE", "http://" + location.host + "/elements/" + this2.id, true);
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
	};
	this.addEventsButtons = function() {
		this.addEventsDelete()
		var this2 = this;
		var right = document.getElementById("right" + this.id);
		right.addEventListener('click', function() {
			if(this2.type == "Image")
			{
				var e = document.getElementById("Element" + this2.id);
				e.removeChild(document.getElementById(this2.id + "content"));
				var input = document.createElement('input');
				input.type = "text";
				input.value = "Petit texte";
				input.id = "inpContent" + this2.id;
				input.className = "inpContent";
				e.appendChild(input);
				input.focus();
				this2.type = "PetitTexte";
				var left = document.getElementById("left" + this2.id);
				left.style.display = "inline-block";
				jsPlumb.repaintEverything();
			}
			else if(this2.type == "PetitTexte")
			{
				var e = document.getElementById("Element" + this2.id);
				e.removeChild(document.getElementById("inpContent" + this2.id));
				var textarea = document.createElement("textarea");
				textarea.id = "textareaContent" + this2.id;
				textarea.className = "textareaContent";
				textarea.innerHTML = "Texte long";
				textarea.rows = 3;
				textarea.cols = 18;
				e.appendChild(textarea);
				textarea.focus();
				var right = document.getElementById("right" + this2.id);
				right.style.display = "none";
				var left = document.getElementById("left" + this2.id);
				left.style.top = "-20px";
				jsPlumb.repaintEverything();
				this2.type = "GrandTexte";
			}
		});

		var left = document.getElementById("left" + this.id);
		left.addEventListener('click', function() {
			if(this2.type == "GrandTexte")
			{
				var e = document.getElementById("Element" + this2.id);
				e.removeChild(document.getElementById("textareaContent" + this2.id));
				var input = document.createElement('input');
				input.type = "text";
				input.value = "Petit texte";
				input.id = "inpContent" + this2.id;
				input.className = "inpContent";
				e.appendChild(input);
				input.focus();
				this2.type = "PetitTexte";
				var right = document.getElementById('right' + this2.id);
				right.style.display = "inline-block";
				var left = document.getElementById("left" + this2.id);
				left.style.top = "";
				jsPlumb.repaintEverything();
			}
			else if(this2.type == "PetitTexte")
			{
				var e = document.getElementById("Element" + this2.id);
				e.removeChild(document.getElementById("inpContent" + this2.id));
				var p = document.createElement("p");
				p.id = this2.id + "content";
				p.className = "value";
				p.innerHTML = "Image";
				e.appendChild(p);
				var left = document.getElementById("left" + this2.id);
				left.style.display = "none";
				jsPlumb.repaintEverything();
				this2.type = "Image";
			}
		});

		var val = document.getElementById("validate" + this.id);
		val.addEventListener('click', function() {
			var e = document.getElementById("Element" + this2.id);
			if(this2.type == "PetitTexte")
			{
				var inp = document.getElementById('inpContent' + this2.id);
				var text = inp.value;
				e.removeChild(inp);
				var p = document.createElement('p');
				p.innerHTML = text;
				p.className = "value petitTexte";
				p.id = this2.id + "content";
				e.appendChild(p);
				this2.sendUpdate("Petit Texte");
			}
			else if(this2.type == "GrandTexte") {
				var textarea = document.getElementById("textareaContent" + this2.id);
				var text = textarea.innerHTML;
				e.removeChild(textarea);
				var p = document.createElement("p");
				p.innerHTML = text;
				p.className = "value grandTexte";
				p.id = this2.id + "content";
				e.appendChild(p);
				this2.sendUpdate("Grand Texte");
			}
			else if(this2.type == "Image")
			{
				var img = document.getElementById(this2.id + "content");
				img.parentNode.removeChild(img);
				var p = document.createElement("p");
				p.className = "value";
				p.id = this2.id + "content";
				e.appendChild(p);
				var a = document.createElement('a');
				a.className = "image";
				a.href = "/rasterizer";
				a.innerHTML = "Uploadez votre image";
				p.appendChild(a);
				$(".image").colorbox({iframe:true, width:"50%", height:"70%"});
			}
			e.parentNode.removeChild(document.getElementById("left" + this2.id));
			e.parentNode.removeChild(document.getElementById("right" + this2.id));
			var val = document.getElementById('validate' + this2.id);
			val.parentNode.removeChild(val);
			this2.addEvents(document.getElementById(this2.name + this2.id));
			jsPlumb.repaintEverything();
		});
	};

	this.addEvents = function(div) {
		var this2 = this;
		if(this.type == "PetitTexte")
		{
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
						p2.className = "value petitTexte";
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
						p2.className = "value petitTexte";
						div.insertBefore(p2, div.firstChild);
						div.removeChild(inp);
						this2.sendUpdate(val);
					});
				});
			}
		}
		else if(this.type == "GrandTexte")
		{
			if(div.addEventListener) {
				div.addEventListener('dblclick', function() {
					var p = document.getElementById(this2.id + "content");
					var pText = p.innerHTML;
					div.removeChild(p);
					var inp = document.createElement("textarea");
					inp.innerHTML = pText;
					inp.id = "textareaContent" + this2.id;
					inp.className = "textareaContent";
					inp.rows = 3;
					inp.cols = 18;
					div.appendChild(inp);
					inp.focus();

					inp.addEventListener('blur', function() {

						var val = inp.value;
						var p2 = document.createElement('p');
						p2.innerHTML = val;
						p2.id = this2.id + "content";
						p2.className = "value grandTexte";
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
					var inp = document.createElement("textarea");
					inp.innerHTML = pText;
					inp.id = "textareaContent" + this2.id;
					inp.className = "textareaContent";
					inp.rows = 3;
					inp.cols = 18;
					div.appendChild(inp);
					inp.focus();
					inp.addEvent('onblur', function() {
						var val = inp.innerHTML;
						var p2 = document.createElement('p');
						p2.innerHTML = val;
						p2.id = this2.id + "content";
						p2.className = "value grandTexte";
						div.appendChild(p2);
						div.removeChild(inp);
						this2.sendUpdate(val);
					});
				});
			}
		}
	};
};

//Element.prototype = Object.create(Item.prototype);