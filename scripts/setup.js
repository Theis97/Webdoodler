/*
 * Sets up UI elements with their functionality.
 */
function setup() {
	var doodleWidth = 1200;
	var doodleHeight = 800;

	var actionHandler = new ActionHandler();
	var layerManager = new LayerManager(doodleWidth, doodleHeight, actionHandler);
	testLayerManager = layerManager;
	var canvas = document.getElementById('layer0');
	var currToolIndicator = document.getElementById('currToolIndicator');
	var loadedImg = new Image();

	var colorPicker = document.getElementById('colorPicker');
	currTool = new Brush(colorPicker);
	colorPicker.addEventListener('change', function(event) {
		currTool.changeColor('#' + colorPicker.jscolor);
	});

	var colorPalette = new ColorPalette(colorPicker);

	var sizeSlider = document.getElementById('brushSize');
	sizeSlider.value = currTool.size;
	sizeSlider.addEventListener('pointerup', function(event) {
		currTool.changeSize(sizeSlider.value);
	});

	var brushButton = document.getElementById('brushButton');
	brushButton.addEventListener('click', function(event) {
		currTool = new Brush(colorPicker);
		currTool.changeSize(sizeSlider.value);
		currToolIndicator.textContent = 'Brush';
	});

	var eraserButton = document.getElementById('eraserButton');
	eraserButton.addEventListener('click', function(event) {
		currTool = new Eraser();
		currTool.changeSize(sizeSlider.value);
		currToolIndicator.textContent = 'Eraser';
	});

	var lineButton = document.getElementById('lineButton');
	lineButton.addEventListener('click', function(event) {
		currTool = new Line(colorPicker);
		currTool.changeSize(sizeSlider.value);
		currToolIndicator.textContent = 'Line';
	});

	var eyedropperButton = document.getElementById('eyedropperButton');
	eyedropperButton.addEventListener('click', function(event) {
		currTool = new Eyedropper(colorPicker);
		currToolIndicator.textContent = 'Eyedropper';
	});

	var selectionButton = document.getElementById('selectionButton');
	selectionButton.addEventListener('click', function(event) {
		currTool = new Selection();
		currToolIndicator.textContent = 'Selection'
	});

	var moveButton = document.getElementById('moveButton');
	moveButton.addEventListener('click', function(event) {
		currTool = new MoveSelection();
		currToolIndicator.textContent = 'Move Selection'
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

	var intensifyButton = document.getElementById('intensifyButton');
	intensifyButton.addEventListener('click', function(event) {
		var layer = layerManager.getActiveLayer();
    var canvas = layer.canvas;
    var context = canvas.getContext("2d");
		intensify(canvas, context);
		actionHandler.addFilter(layerManager, intensify);
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
