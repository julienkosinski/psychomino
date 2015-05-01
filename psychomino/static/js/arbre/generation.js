$('.generate button').on('click', function(){
	branches = getAllElementsValue('.branch .value');
	images = getAllElementsValue('.elementImage .value');
	longText = getAllElementsValue('.elementLongText .value');
	littleText = getAllElementsValue('.elementLittletext .value');
})

function getAllElementsValue(className){
	var elements = new Array(); 
	$(className).each(function(index){
		elements[elements.length] = $(this).text();
	});
	return elements;
}