var Branch = function() {
	var branchThis = this;
	Item.call(this);
	this.name = "Branch";
	this.content = "Nouvelle branche";
	this.setId = function() {
		var formData = new FormData();
		formData.append('branch_title','Nouvelle branche');
		formData.append('branch_lesson', this.parentId);
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
		element.parentId = this.id;
		element.setId();
	};
	this.callback = function() {
		this.addDivNode();
		this.addDivChildren();
		this.setLink();
		this.addElement(this.id);
	};
	this.sendUpdate = function(text) {
		var formData = new FormData();
		formData.append('branch_title',text);
		formData.append('branch_lesson', this.parentId);
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
};

//Branch.prototype = Object.create(Item.prototype);