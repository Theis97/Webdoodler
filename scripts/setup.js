// https://www.html5canvastutorials.com/advanced/html5-canvas-mouse-coordinates/
function getPointerPosition(canvas, event) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: event.clientX - rect.left,
		y: event.clientY - rect.top
	};
}

/*
 * Sets up UI elements with their functionality.
 */
function setup() {
	var actionHandler = new ActionHandler();
	var canvas = document.getElementById('drawingLayer');
	var context = canvas.getContext("2d");
	var currToolIndicator = document.getElementById('currToolIndicator');

	var colorPicker = document.getElementById('colorPicker');
	var currTool = new Brush(colorPicker);
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

	var eyedropperButton = document.getElementById('eyedropperButton');
	eyedropperButton.addEventListener('click', function(event) {
		currTool = new Eyedropper(colorPicker);
		currToolIndicator.textContent = 'Selected: Eyedropper';
	});

	var undoButton = document.getElementById('undoButton');
	undoButton.addEventListener('click', function(event) {
		actionHandler.undo(canvas, context);
	});

	canvas.addEventListener('pointermove', function(event) {
		var position = getPointerPosition(canvas, event);
		currTool.onMove(context, position.x, position.y);
		actionHandler.updateCurrentAction(position.x, position.y);
  });
	canvas.addEventListener('pointerdown', function(event) {
		var position = getPointerPosition(canvas, event);
		currTool.onDown(context, position.x, position.y);
		actionHandler.addNewAction(currTool.copy(), position.x, position.y);
	});
	canvas.addEventListener('pointerup', function(event) {
		var position = getPointerPosition(canvas, event);
		currTool.onUp(context, position.x, position.y);
		actionHandler.setRecording(false);
	});
	canvas.addEventListener('pointerleave', function(event) {
		var position = getPointerPosition(canvas, event);
		currTool.onLeave(context, position.x, position.y);
		actionHandler.actionInterrupted(position.x, position.y);
	});
}
