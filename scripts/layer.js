// https://www.html5canvastutorials.com/advanced/html5-canvas-mouse-coordinates/
function getPointerPosition(canvas, event) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: event.clientX - rect.left,
		y: event.clientY - rect.top
	};
}

/*
 * A class representing a single layer of the doodle.
 */
class Layer {
  constructor(id, width, height, layerManager, actionHandler) {
    this.layerManager = layerManager;
    this.actionHandler = actionHandler;
    this.id = id;
    this.canvas = null;
    this.listItem = null;
    this.isActive = false;
    this.setupCanvas(id, width, height);
    this.setupListItem(id);
  }

  setupCanvas(id, width, height) {
    this.canvas = document.createElement('canvas');
    var canvas = this.canvas;
    canvas.id = id;
    canvas.width = width;
    canvas.height = height;
    canvas.classList.add('drawingLayer');
    canvas.classList.add('inactiveLayer');
    canvas.style.zIndex = id * 2;

    var context = canvas.getContext("2d");
    var layerManager = this.layerManager;
    var actionHandler = this.actionHandler;
    canvas.addEventListener('pointerdown', function(event) {
      var layer = layerManager.getLayer(this.id);
      if(layer.isActive) {
        var position = getPointerPosition(canvas, event);
        currTool.onDown(context, position.x, position.y);
        actionHandler.addNewStroke(this.id, currTool.copy(),
                                   position.x, position.y);
      }
    });
    canvas.addEventListener('pointermove', function(event) {
      var layer = layerManager.getLayer(this.id);
      if(layer.isActive) {
        var position = getPointerPosition(canvas, event);
        currTool.onMove(context, position.x, position.y);
        actionHandler.updateCurrentStroke(currTool, position.x, position.y);
      }
    });
    canvas.addEventListener('pointerup', function(event) {
      var layer = layerManager.getLayer(this.id);
      if(layer.isActive) {
        var position = getPointerPosition(canvas, event);
        currTool.onUp(context, position.x, position.y);
        actionHandler.strokeInterrupted(currTool, position.x, position.y);
      }
    });
    canvas.addEventListener('pointerleave', function(event) {
      var layer = layerManager.getLayer(this.id);
      if(layer.isActive) {
        var position = getPointerPosition(canvas, event);
        currTool.onLeave(context, position.x, position.y);
        actionHandler.strokeInterrupted(currTool, position.x, position.y);
      }
    });
  }

  setupListItem(id) {
    var listItem = document.createElement('li');
    this.listItem = listItem;
    listItem.id = "layer" + id + "Listing";

    var label = document.createElement('label');
    label.textContent = "Layer " + id;
		label.classList.add("layerListLabel");
    listItem.appendChild(label);

    var makeActiveButton = document.createElement('button');
    makeActiveButton.textContent = "Make Active";
    var layerManager = this.layerManager;
    var id = this.id;
    makeActiveButton.addEventListener('click', function(event) {
      layerManager.updateActiveLayer(id);
			layerManager.activeLayerPreview();
			actionHandler.layerSelected(id);
    });
    listItem.appendChild(makeActiveButton);

    var deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";
		var actionHandler = this.actionHandler;
    deleteButton.addEventListener('click', function(event) {
      layerManager.removeLayer(id);
			actionHandler.layerDeleted(id);
    });
    listItem.appendChild(deleteButton);

		var moveUpButton = document.createElement('button');
		moveUpButton.textContent = "Move up";
		moveUpButton.addEventListener('click', function(event) {
			layerManager.moveLayer(id, 1);
			actionHandler.layerMoved(id, 1);
		});
		listItem.appendChild(moveUpButton);

		var moveDownButton = document.createElement('button');
		moveDownButton.textContent = "Move down";
		moveDownButton.addEventListener('click', function(event) {
			layerManager.moveLayer(id, -1);
			actionHandler.layerMoved(id, -1);
		});
		listItem.appendChild(moveDownButton);
  }

  clear() {
    var context = this.canvas.getContext("2d");
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

	hide() {
		this.canvas.classList.add('hiddenLayer');
	}

	show() {
		this.canvas.classList.remove('hiddenLayer');
	}

  markActiveState(isActive) {
    this.isActive = isActive;
    if(isActive) {
      this.canvas.classList.remove('inactiveLayer');
      this.listItem.classList.add('layerSelected');
    } else {
      this.canvas.classList.add('inactiveLayer');
      this.listItem.classList.remove('layerSelected');
    }
  }

  removeUI() {
    this.listItem.parentNode.removeChild(this.listItem);
    this.canvas.parentNode.removeChild(this.canvas);
  }
}
