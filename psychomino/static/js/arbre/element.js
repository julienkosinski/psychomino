var Element = function() {
	var elementThis = this;
	Item.call(this);
	this.name = "Element";
	this.content = "Nouvel élément";
	this.setId = function() {
		var formData = new FormData();
		formData.append('element_content','Nouvelle element');
		formData.append('element_type','TEXT');
		formData.append('element_branch', this.parentId);
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
	this.callback = function() {
		this.addDivNode();
		this.addDivChildren();
		this.addButtons();
		this.setClass();
		this.setLink()
	};
	this.sendUpdate = function(text) {
		var formData = new FormData();
		formData.append('element_content',text);
		formData.append('element_type','TEXT');
		formData.append('element_branch', this.parentId);
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
	this.addButtons = function() {
		var a = document.createElement('a');
		var div = document.getElementById(this.name + this.id);
		a.className = "left";
		a.innerHTML = "<";
		var b = document.createElement('a');
		b.className = "right";
		a.innerHTML = ">";
		var c = document.createElement('a');
		c.className = "btn delete item";
		c.innerHTML = "X";
		div.parentNode.insertBefore(b,div);
		div.parentNode.insertBefore(a, div);
		div.parentNode.insertBefore(c, div);
	};
	this.setClass = function() {
		var div = document.getElementById(this.name + this.id);
		div.className = "item-element";
	};
};

//Element.prototype = Object.create(Item.prototype);