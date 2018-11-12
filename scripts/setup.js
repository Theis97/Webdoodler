// https://www.html5canvastutorials.com/advanced/html5-canvas-mouse-coordinates/
function getPointerPosition(canvas, event) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: event.clientX - rect.left,
		y: event.clientY - rect.top
	};
}


function setup() {
	var canvas = document.getElementById('drawingLayer');
	var context = canvas.getContext("2d");
	var currTool = new Brush();

	var sizeSlider = document.getElementById('brushSize');
	sizeSlider.value = currTool.size;

	sizeSlider.addEventListener('pointerup', function(event) {
		currTool.changeSize(sizeSlider.value);
	});


	canvas.addEventListener('pointermove', function(event) {
		var position = getPointerPosition(canvas, event);
		currTool.onMove(context, position.x, position.y);
  });
	canvas.addEventListener('pointerdown', function(event) {
		var position = getPointerPosition(canvas, event);
		currTool.onDown(context, position.x, position.y);
	});
	canvas.addEventListener('pointerup', function(event) {
		var position = getPointerPosition(canvas, event);
		currTool.onUp(context, position.x, position.y);
	});
	canvas.addEventListener('pointerleave', function(event) {
		var position = getPointerPosition(canvas, event);
		currTool.onLeave(context, position.x, position.y);
	});
}
