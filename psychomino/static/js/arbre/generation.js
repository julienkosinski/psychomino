var svgConstArray = {width: 2267.716536, height: 1511.811024};
var pdfConstArray = {width: 1122.519685, height: 793.700787};
var svgNS = "http://www.w3.org/2000/svg"; 
var	svgId = 0;

var branchesConstArray = {width: 170.07874, height: 68.031496};
var imagesConstArray = {width: 170.07874, height: 170.07874};
var longTextConstArray = {width: 219.212598, height: 170.07874};
var shortTextConstArray = {width: 68.031496, height: 68.031496};

var	svgX = 0;
var	svgY = 0;

var elementsResizeWrap = 0;
var elementsCentralAlign = 0;
var elementsCentralResizeWrap = 0;

$('.generate button').on('click', function(){
	generateDocuments($(this).val());
})

function getAllElementsValue(className){
	var elements = new Array(); 
	$(className).each(function(index){
		elements[elements.length] = $(this).text();
	});
	return elements;
}

function generateDocuments(documentType){
	if(documentType=='svg'){
		fileW = svgConstArray['width'];
		fileH = svgConstArray['height'];
	}
	else if(documentType == 'pdf'){
		fileW = pdfConstArray['width'];
		fileH = pdfConstArray['height'];
	}

	branches = getAllElementsValue('.branch .value');
	branchH = branchesConstArray['height'];
	branchW = branchesConstArray['width'];

	if(branches.length <= 0){
		throw new Error("Please insert at least one branch!");
	}

	var svg = document.createElementNS(svgNS, "svg");
	svg.setAttribute('id', 'svg-'+svgId);
	svg.setAttribute('width', fileW);
	svg.setAttribute('height', fileH);

	svg = generateBranchBlocs(branches, fileW, fileH, branchW, branchH, svg);

	images = getAllElementsValue('.elementImage .value');
	if(images.length > 0){

		imgH = imagesConstArray['height'];
		imgW = imagesConstArray['width'];
		svg = generateImagesBlocs(images, fileW, fileH, imgW, imgH, svg);
		
	}

	longTexts = getAllElementsValue('.elementLongText .value');
	if(longTexts.length > 0){

		longTextH = longTextConstArray['height'];
		longTextW = longTextConstArray['width'];
		svg = generateTextBlocs(longTexts, fileW, fileH, longTextW, longTextH, svg);

	}

	littleTexts = getAllElementsValue('.elementLittletext .value');
	if(littleTexts.length > 0){

		littleTextH = shortTextConstArray['height'];
		littleTextW = shortTextConstArray['width'];
		svg = generateSmallTextBlocs(littleTexts, fileW, fileH, littleTextW, littleTextH, svg);
		
	}

	if(svg.children.length > 0){
		document.body.appendChild(svg);
	}

	actionsBeforeHide(documentType);
}

function testPlacementBloc(fileW, fileH, elemW, elemH)
{
	if(svgX + elemW >= fileW){
		svgX = 0;
		if(svgY + elemH + elemH >= fileH){
			svgY = 0;
			return false;
		}
		else{
			svgY = svgY + elemH;
		}
	}
	return true;
}

function resetPosition(elem)
{
	if(svgX == 0){
		if(svgY != 0){
			svgY = svgY + elem;
		}
	}
	else{
		svgX = 0;
		svgY = svgY + elem;
	}
}

function generateImagesBlocs(contents, fileW, fileH, elemW, elemH, svg)
{
	for(var key in contents){
		if(testPlacementBloc(fileW, fileH, elemW, elemH) == false){
			document.body.appendChild(svg);
			svgId = svgId + 1;
			var svg = document.createElementNS(svgNS, "svg");
			svg.setAttribute('id', 'svg-'+svgId);
			svg.setAttribute('width', fileW);
			svg.setAttribute('height', fileH);
		}
		rect = document.createElementNS(svgNS, "rect");
		rect.setAttribute('width', elemW);
		rect.setAttribute('height', elemH);
		rect.setAttribute('fill', 'white');
		rect.setAttribute('stroke', 'black');
		rect.setAttribute('stroke-width', '1');
		rect.setAttribute('x', svgX);
		rect.setAttribute('y', svgY);
		rect.setAttribute('class','shape');
		svg.appendChild(rect);

		textArea = document.createElementNS(svgNS,"text");
		textArea.setAttribute('id','rect');
		textArea.setAttribute('class','wrap');
		textArea.setAttribute('x', svgX);
		textArea.setAttribute('y', svgY);
		textArea.setAttribute('font-size', '12pts');
		textArea.setAttribute('stroke', 'black');
		textArea.textContent = contents[key];
		svg.appendChild(textArea);

		svgX = svgX + elemW;
	}
	resetPosition(elemH);
	return svg;
}

function generateBranchBlocs(contents, fileW, fileH, elemW, elemH, svg)
{
	for(var key in contents){
		if(testPlacementBloc(fileW, fileH, elemW, elemH) == false){
			document.body.appendChild(svg);
			svgId = svgId + 1;
			var svg = document.createElementNS(svgNS, "svg");
			svg.setAttribute('id', 'svg-'+svgId);
			svg.setAttribute('width', fileW);
			svg.setAttribute('height', fileH);
		}
		rect = document.createElementNS(svgNS, "rect");
		rect.setAttribute('width', elemW);
		rect.setAttribute('height', elemH);
		rect.setAttribute('fill', 'white');
		rect.setAttribute('stroke', 'black');
		rect.setAttribute('stroke-width', '1');
		rect.setAttribute('x', svgX);
		rect.setAttribute('y', svgY);
		rect.setAttribute('class','shape');
		svg.appendChild(rect);

		textArea = document.createElementNS(svgNS,"text");
		textArea.setAttribute('id','rectAlign-'+elementsCentralAlign);
		elementsCentralAlign = elementsCentralAlign + 1;
		textArea.setAttribute('class','wrap');
		textArea.setAttribute('x', svgX);
		textArea.setAttribute('y', svgY);
		textArea.setAttribute('font-size', '14pts');
		textArea.textContent = contents[key];
		svg.appendChild(textArea);

		svgX = svgX + elemW;
	}
	resetPosition(elemH);
	return svg;
}

function generateTextBlocs(contents, fileW, fileH, elemW, elemH, svg)
{
	for(var key in contents){
		if(testPlacementBloc(fileW, fileH, elemW, elemH) == false){
			document.body.appendChild(svg);
			svgId = svgId + 1;
			var svg = document.createElementNS(svgNS, "svg");
			svg.setAttribute('id', 'svg-'+svgId);
			svg.setAttribute('width', fileW);
			svg.setAttribute('height', fileH);
		}
		rect = document.createElementNS(svgNS, "rect");
		rect.setAttribute('width', elemW);
		rect.setAttribute('height', elemH);
		rect.setAttribute('fill', 'white');
		rect.setAttribute('stroke', 'black');
		rect.setAttribute('stroke-width', '1');
		rect.setAttribute('x', svgX);
		rect.setAttribute('y', svgY);
		rect.setAttribute('class','shape');
		svg.appendChild(rect);

		textArea = document.createElementNS(svgNS,"text");
		textArea.setAttribute('id','rectResize-'+elementsResizeWrap);
		elementsResizeWrap = elementsResizeWrap + 1;
		textArea.setAttribute('class','wrap');
		textArea.setAttribute('x', svgX);
		textArea.setAttribute('y', svgY);
		textArea.setAttribute('font-size', '12pts');
		textArea.textContent = contents[key];
		svg.appendChild(textArea);

		svgX = svgX + elemW;
	}
	resetPosition(elemH);
	return svg;
}

function generateSmallTextBlocs(contents, fileW, fileH, elemW, elemH, svg)
{
	for(var key in contents){
		if(testPlacementBloc(fileW, fileH, elemW, elemH) == false){
			document.body.appendChild(svg);
			svgId = svgId + 1;
			var svg = document.createElementNS(svgNS, "svg");
			svg.setAttribute('id', 'svg-'+svgId);
			svg.setAttribute('width', fileW);
			svg.setAttribute('height', fileH);
		}
		rect = document.createElementNS(svgNS, "rect");
		rect.setAttribute('width', elemW);
		rect.setAttribute('height', elemH);
		rect.setAttribute('fill', 'white');
		rect.setAttribute('stroke', 'black');
		rect.setAttribute('stroke-width', '1');
		rect.setAttribute('x', svgX);
		rect.setAttribute('y', svgY);
		rect.setAttribute('class','shape');
		svg.appendChild(rect);

		textArea = document.createElementNS(svgNS,"text");
		textArea.setAttribute('id','rectSmallResize-'+elementsCentralResizeWrap);
		elementsCentralResizeWrap = elementsCentralResizeWrap + 1;
		textArea.setAttribute('class','wrap');
		textArea.setAttribute('x', svgX);
		textArea.setAttribute('y', svgY);
		textArea.setAttribute('font-size', '12pts');
		textArea.textContent = contents[key];
		svg.appendChild(textArea);

		svgX = svgX + elemW;
	}
	resetPosition(elemH);
	return svg;
}


function actionsBeforeHide(output_format)
{
	for (var i = 0; i < elementsResizeWrap; i++) {
		d3plus.textwrap()
	    .container(d3.select("#rectResize-"+i)).resize(true).valign("middle")
	    .draw();
	};

	for (var i = 0; i < elementsCentralAlign; i++) {
		d3plus.textwrap()
	    .container(d3.select("#rectAlign-"+i)).align("center").valign("middle")
	    .draw();
	};

	for (var i = 0; i < elementsCentralResizeWrap; i++) {
		d3plus.textwrap()
	    .container(d3.select("#rectSmallResize-"+i)).resize(true).align("center").valign("middle")
	    .draw();
	};
	submit_download_form(output_format);
	$("svg").each(function(index){
		$(this).hide();
	})
}

function submit_download_form(output_format)
{
	// Get the d3js SVG element
	var svg = document.getElementById("svg-0");
	// Extract the data as SVG text string
	var svg_xml = (new XMLSerializer).serializeToString(svg);
	// Submit the <FORM> to the server.
	// The result will be an attachment file to download.
	var form = document.getElementById("svgform");
	form['output_format'].value = output_format;
	form['data'].value = svg_xml ;
	form.submit();
}
