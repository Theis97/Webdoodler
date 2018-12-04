/*
 * Sets up UI elements with their functionality.
 */
function setup() {
	var doodleWidth = 1200;
	var doodleHeight = 800;

	var actionHandler = new ActionHandler();
	var layerManager = new LayerManager(doodleWidth, doodleHeight, actionHandler);
	var canvas = document.getElementById('layer0');
	var currToolIndicator = document.getElementById('currToolIndicator');
	var loadedImg = new Image();

	var colorPicker = document.getElementById('colorPicker');
	currTool = new Brush(colorPicker);
	colorPicker.addEventListener('change', function(event) {
		currTool.changeColor('#' + colorPicker.jscolor);
	});

	var sizeSlider = document.getElementById('brushSize');
	sizeSlider.value = currTool.size;
	sizeSlider.addEventListener('pointerup', function(event) {
		currTool.changeSize(sizeSlider.value);
	});

	var brushButton = document.getElementById('brushButton');
	brushButton.addEventListener('click', function(event) {
		currTool = new Brush(colorPicker);
		currTool.changeSize(sizeSlider.value);
		currToolIndicator.textContent = 'Selected: Brush';
	});

	var lineButton = document.getElementById('lineButton');
	lineButton.addEventListener('click', function(event) {
		currTool = new Line(colorPicker);
		currTool.changeSize(sizeSlider.value);
		currToolIndicator.textContent = 'Selected: Line';
	});

	var eyedropperButton = document.getElementById('eyedropperButton');
	eyedropperButton.addEventListener('click', function(event) {
		currTool = new Eyedropper(colorPicker);
		currToolIndicator.textContent = 'Selected: Eyedropper';
	});

	var undoButton = document.getElementById('undoButton');
	undoButton.addEventListener('click', function(event) {
		actionHandler.undo(layerManager);
	});

	var brightenButton = document.getElementById('brightenButton');
	brightenButton.addEventListener('click', function(event) {
		var layer = layerManager.getActiveLayer();
    var canvas = layer.canvas;
    var context = canvas.getContext("2d");
		brighten(canvas, context);
		actionHandler.addFilter(layerManager, brighten);
	});

	var blurButton = document.getElementById('blurButton');
	blurButton.addEventListener('click', function(event) {
		var layer = layerManager.getActiveLayer();
    var canvas = layer.canvas;
    var context = canvas.getContext("2d");
		blur(canvas, context);
		actionHandler.addFilter(layerManager, blur);
	});

	var fileSelector = document.getElementById('fileSelect');
	fileSelector.addEventListener('change', function(event) {
		loadImage(loadedImg, layerManager, fileSelector.files[0]);
		actionHandler.reset();
		actionHandler.setImage(loadedImg);
	});

	var saveButton = document.getElementById('saveButton');
	saveButton.addEventListener('click', function(event) {
		saveDoodle(layerManager);
	});

	var addLayerButton = document.getElementById('addLayerButton');
	addLayerButton.addEventListener('click', function(event) {
		layerManager.addLayer();
		actionHandler.layerAdded();
	});

}
