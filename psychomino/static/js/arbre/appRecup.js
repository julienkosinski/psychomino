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