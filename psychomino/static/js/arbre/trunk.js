var Trunk = function() {
	var trunkThis = this;
	Item.call(this);
	this.name = 'Trunk';
	this.content = "Nouvelle leçon";
	this.setId = function() {
		var formData = new FormData();
		formData.append('lesson_title','Nouvelle leçon');
		var xhr = this.getXMLHttpRequest();
		xhr.open("POST", "http://" + location.host + "/lessons", true);
		xhr.setRequestHeader('Accept', 'application/json');
		xhr.send(formData);
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4) {
				if(xhr.status == 201) {
					var data = JSON.parse(xhr.responseText);
					trunkThis.id = data.id;
					trunkThis.callback();
				}
				else {
					alert('Impossible de créer une leçon !');
				}
			}
		};
	};
	this.addBranch = function(id) {
		
		var branch = new Branch();
		branch.parent = 'content' + this.name + this.id;
		branch.parentId = this.id;
		branch.setId();
	};
	this.callback = function() {
		this.addDivNode();
		this.addDivChildren();
		this.addButtons();
		this.setClass();
		this.addBranch(this.id);
	};
	this.sendUpdate = function(text) {
		var formData = new FormData();
		formData.append('lesson_title',text);
		var xhr = this.getXMLHttpRequest();
		xhr.open("PUT", "http://" + location.host + "/lessons/" + this.id, true);
		xhr.setRequestHeader('Accept', 'application/json');
		xhr.send(formData);
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4) {
				if(xhr.status != 200) {
					alert('Impossible de modifier la leçon !');
				}
			}
		};
	};
	this.addButtons = function() {
		var a = document.createElement('a');
		var div = document.getElementById(this.name + this.id);
		a.className = "btn add branch";
		div.appendChild(a);
	};
	this.setClass = function() {
		var div = document.getElementById(this.name + this.id);
		div.className = "trunk";
	};
};