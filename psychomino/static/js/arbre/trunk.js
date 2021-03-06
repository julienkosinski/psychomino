var Trunk = function() {
	var trunkThis = this;
	Item.call(this);
	this.name = 'Trunk';
	this.content = "Nouvelle leçon";
	this.numBranch = 0;
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
	this.addBranch = function() {
		this.numBranch += 1;
		var grow = document.createElement('div');
		grow.className = "grow";
		grow.id = "grow" + this.numBranch;
		document.getElementById("contentTrunk" + this.id).appendChild(grow);
		var branch = new Branch();
		branch.parent = "grow" + this.numBranch;
		branch.elementParentId = this.id;
		branch.elementParent = this.name + this.id;
		branch.setId();
	};
	this.callback = function() {
		var fb = document.getElementById('fb');
		var twit = document.getElementById('twit');
		var google = document.getElementById('google');
		fb.href = "http://www.facebook.com/sharer.php?u=" + location.host + "/" + this.id;
		twit.href = "http://twitter.com/home?status=" + location.host + "/" + this.id;
		google.href = "https://plus.google.com/share?url=" + location.host + "/" + this.id;
		this.addDivNode();
		this.addDivChildren();
		this.addButtons();
		this.addEventButtons();
		this.setClass();
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
	this.setContent = function(text) {

		var p = document.createElement('p');
		p.innerHTML = text;
		p.id = this.id + "content";
		p.className = "value";
		document.getElementById(this.name + this.id).appendChild(p);

	};
	this.addButtons = function() {
		var a = document.createElement('a');
		var div = document.getElementById(this.name + this.id);
		a.innerHTML = "+";
		a.className = "btn add branchAdd";
		a.id = "addButton" + this.id;
		div.appendChild(a);
	};
	this.addEventButtons = function() {
		var this2 = this;
		var a = document.getElementById("addButton" + this.id);
		a.addEventListener('click', function() {
			this2.addBranch();
		});
	};
	this.setClass = function() {
		var div = document.getElementById(this.name + this.id);
		div.className = "trunk";
		var div2 = document.getElementById("content" + this.name + this.id);
	};
};