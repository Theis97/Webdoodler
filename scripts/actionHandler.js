/*
 * Keeps track of all changes the user has made to the canvas, can revert
 * canvas to previous states.
 */
class ActionHandler {
  constructor() {
    this.reset();
  }

  setImage(img) {
    this.img = img;
  }

  setRecording(recording) {
    this.recording = recording;
  }

  reset() {
    this.actions = [];
    this.recording = false;
    this.img = null;
  }

  addFilter(layerManager, filter) {
    var layerId = layerManager.getActiveLayer().id;
    this.actions.push(new FilterAction(layerId, filter));
  }

  addNewStroke(layerId, tool, x, y) {
    if(tool.isRecorded()) {
      this.recording = true;
      this.actions.push(new Stroke(layerId, tool.copy(), x, y));
    }
  }

  updateCurrentStroke(x, y) {
    if(this.recording) {
      this.actions[this.actions.length - 1].addCoord(x, y);
    }
  }

  strokeInterrupted(x, y) {
    if(this.recording) {
      this.actions[this.actions.length - 1].addCoord(x, y);
      this.recording = false;
    }
  }

  redraw(layerManager) {
    layerManager.clearLayers();
    if (this.img != null) {
      layerManager.setBackgroundImgLayer(this.img);
    }
    for (let action of this.actions) {
      action.doAction(layerManager);
    }
  }

  undo(layerManager) {
    this.actions.pop();
    this.redraw(layerManager);
  }
}
