var Branch = function() {
	var branchThis = this;
	Item.call(this);
	this.name = "Branch";
	this.content = "Nouvelle branche";
	this.setId = function() {
		var formData = new FormData();
		formData.append('branch_title','Nouvelle branche');
		formData.append('branch_lesson', this.elementParentId);
		var xhr = this.getXMLHttpRequest();
		xhr.open("POST", "http://" + location.host + "/branches", true);
		xhr.setRequestHeader('Accept', 'application/json');
		xhr.send(formData);
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4) {
				if(xhr.status == 201) {
					var data = JSON.parse(xhr.responseText);
					branchThis.id = data.id;
					branchThis.callback();
				}
				else {
					alert('Impossible de créer une branche !');
				}
			}
		}
	};
	this.addElement = function(id) {
		
		var element = new Element();
		element.parent = 'content' + this.name + this.id;
		element.elementParentId = this.id;
		element.elementParent = this.name + this.id;
		element.setId();
	};
	this.callback = function() {
		this.addDivNode();
		this.addDivChildren();
		this.addButtons();
		this.addEventsButtons();
		this.setClass();
		this.setLink();
		jsPlumb.repaintEverything();
	};
	this.sendUpdate = function(text) {
		var formData = new FormData();
		formData.append('branch_title',text);
		formData.append('branch_lesson', this.elementParentId);
		var xhr = this.getXMLHttpRequest();
		xhr.open("PUT", "http://" + location.host + "/branches/" + this.id, true);
		xhr.setRequestHeader('Accept', 'application/json');
		xhr.send(formData);
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4) {
				if(xhr.status != 200) {
					alert('Impossible de créer une branche !');
				}
			}
		}
	};
	this.addButtons = function() {
		var a = document.createElement('a');
		var div = document.getElementById(this.name + this.id);
		a.className = "btn add branchAdd";
		a.innerHTML = "+";
		a.id = "addButton" + this.id;
		var b = document.createElement('a');
		b.className = "btn delete item";
		b.innerHTML = "x";
		b.id = "deleteButton" + this.id;
		var c = document.createElement('a');
		c.className = "btn show branchHide";
		c.innerHTML = "↓"
		c.style.display = "none";
		var d = document.createElement('a');
		d.className = "btn hide branchHide";
		d.innerHTML = "↑";
		div.insertBefore(b,document.getElementById(this.id + "content"));
		div.appendChild(a);
		div.appendChild(d);
		div.appendChild(c);
		/*<a href="#" class="btn add branchAdd">+</a>
        <a href="#" class="btn hide branchHide">↑</a>
        <a href="#" class="btn show branchHide">↓</a>
        <a href="#" class="btn delete item">x</a>*/
	};
	this.addEventsButtons = function() {
		var this2 = this;
		var d = document.getElementById("deleteButton" + this.id);
		d.addEventListener('click', function() {
			jsPlumb.detachAllConnections(d.parentNode);
			d.parentNode.parentNode.parentNode.removeChild(d.parentNode.parentNode);
			jsPlumb.repaintEverything();
			var xhr = this2.getXMLHttpRequest();
			xhr.open("DELETE", "http://" + location.host + "/branches/" + this2.id, true);
			xhr.setRequestHeader('Accept', 'application/json');
			xhr.send();
			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4) {
					if(xhr.status != 204) {
						alert('Impossible de supprimer la branche !');
					}
				}
			};
		});
		var a = document.getElementById("addButton" + this.id);
		a.addEventListener('click', function() {
			this2.addElement(this.id);
		});
	};
	this.setClass = function() {
		var div = document.getElementById(this.name + this.id);
		div.className = "branch";
		var div2 = document.getElementById('content' + this.name + this.id);
		div2.className = "contentBranch";
	};
};

//Branch.prototype = Object.create(Item.prototype);