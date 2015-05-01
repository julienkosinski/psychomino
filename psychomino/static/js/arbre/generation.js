var svgConstArray = {width: 600, height: 400};
var pdfConstArray = {width: 297, height: 210};
var svgNS = "http://www.w3.org/2000/svg"; 
var	svgId = 0;

var branchesConstArray = {width: 45, height: 18};
var imagesConstArray = {width: 45, height: 45};
var longTextConstArray = {width: 58, height: 45};
var shortTextConstArray = {width: 18, height: 18};

var	svgX = 0;
var	svgY = 0;

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

	var svg = document.createElementNS(svgNS, "svg");
	svg.setAttribute('id', 'svg-'+svgId);

	branches = getAllElementsValue('.branch .value');
	branchH = branchesConstArray['height'];
	branchW = branchesConstArray['width'];

	svg = generateBlocs(branches, fileW, fileH, branchW, branchH, svg);

	images = getAllElementsValue('.elementImage .value');
	if(images.length > 0){

		imgH = imagesConstArray['height'];
		imgW = imagesConstArray['width'];
		svg = generateBlocs(images, fileW, fileH, imgW, imgH, svg);
		
	}

	longTexts = getAllElementsValue('.elementLongText .value');
	if(longTexts.length > 0){

		longTextH = longTextConstArray['height'];
		longTextW = longTextConstArray['width'];
		svg = generateBlocs(longTexts, fileW, fileH, longTextW, longTextH, svg);

	}

	littleTexts = getAllElementsValue('.elementLittletext .value');
	if(littleTexts.length > 0){

		littleTextH = shortTextConstArray['height'];
		littleTextW = shortTextConstArray['width'];
		svg = generateBlocs(littleTexts, fileW, fileH, littleTextW, littleTextH, svg);
		
	}
	if(svg.children.length > 0){
		document.body.appendChild(svg);
	}
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

function generateBlocs(contents, fileW, fileH, elemW, elemH, svg)
{
	for(var key in contents){
		if(testPlacementBloc(fileW, fileH, elemW, elemH) == true){
			// TODO : SVG CREATION BLOCK
			// file x actual placement = svgX & file Y actal placement = svgY
			// text content = contents[key]
			// elem width = elemW & elem height = elemH

			//OBLIGATORY PART
			svgX = svgX + elemW;
		}
		else{
			document.body.appendChild(svg);
			svgId = svgId + 1;
			console.log(svgId);
			var svg = document.createElementNS(svgNS, "svg");
			svg.setAttribute('id', 'svg-'+svgId);

			// TODO : SVG CREATION BLOCK
			// file x actual placement = svgX & file Y actal placement = svgY
			// text content = contents[key]
			// elem width = elemW & elem height = elemH

			//OBLIGATORY PART
			svgX = svgX + elemW;
		}
	}
	resetPosition(elemH);
	return svg;
}