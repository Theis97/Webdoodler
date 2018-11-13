// https://www.html5canvastutorials.com/advanced/html5-canvas-mouse-coordinates/
function getPointerPosition(canvas, event) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: event.clientX - rect.left,
		y: event.clientY - rect.top
	};
}

function redraw(canvas, context, actions) {
	context.clearRect(0, 0, canvas.width, canvas.height);
	for (action of actions) {
		action.doAction(context);
	}
}

function undo(canvas, context, actions) {
	actions.pop();
	redraw(canvas, context, actions);
}

function setupCanvas(tool) {

}

function setup() {
	var actions = [];
	var canvas = document.getElementById('drawingLayer');
	var context = canvas.getContext("2d");
	var currTool = new Brush();
	var isDown = false;

	var colorPicker = document.getElementById('colorPicker');
	colorPicker.addEventListener('change', function(event) {
		currTool.changeColor('#' + colorPicker.jscolor);
	});

	var undoButton = document.getElementById('undoButton');
	undoButton.addEventListener('click', function(event) {
		undo(canvas, context, actions);
	});

	var sizeSlider = document.getElementById('brushSize');
	sizeSlider.value = currTool.size;

	sizeSlider.addEventListener('pointerup', function(event) {
		currTool.changeSize(sizeSlider.value);
	});

	canvas.addEventListener('pointermove', function(event) {
		var position = getPointerPosition(canvas, event);
		currTool.onMove(context, position.x, position.y);
		if(isDown) {
			actions[actions.length - 1].addCoord(position.x, position.y);
		}
  });
	canvas.addEventListener('pointerdown', function(event) {
		var position = getPointerPosition(canvas, event);
		actions.push(new Action(currTool.copy(), position.x, position.y));
		isDown = true;
		currTool.onDown(context, position.x, position.y);
	});
	canvas.addEventListener('pointerup', function(event) {
		var position = getPointerPosition(canvas, event);
		isDown = false;
		currTool.onUp(context, position.x, position.y);
	});
	canvas.addEventListener('pointerleave', function(event) {
		var position = getPointerPosition(canvas, event);
		currTool.onLeave(context, position.x, position.y);
		if(isDown) {
			actions[actions.length - 1].addCoord(position.x, position.y);
			isDown = false;
		}
	});
}
