var Element = function() {
	var elementThis = this;
	Item.call(this);
	this.name = "Element";
	this.content = "Nouvel élément";
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

		document.getElementById(this.parent).appendChild(div);
		this.setContent('Image');
	};
	this.callback = function() {
		this.addDivNode();
		this.addEventsButtons();
		this.setLink();
	};
	this.sendUpdate = function(text) {
		var formData = new FormData();
		formData.append('element_content',text);
		formData.append('element_type','TEXT');
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
	this.addEventsButtons = function() {
		var this2 = this;
		var d = document.getElementById("deleteButton" + this.id);
		d.addEventListener('click', function() {
			jsPlumb.detachAllConnections(d.parentNode);
			d.parentNode.parentNode.removeChild(d.parentNode);
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
};

//Element.prototype = Object.create(Item.prototype);