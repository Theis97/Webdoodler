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

  addFilter(filter) {
    this.actions.push(new FilterAction(filter));
  }

  addNewStroke(tool, x, y) {
    if(tool.isRecorded()) {
      this.recording = true;
      this.actions.push(new Stroke(tool.copy(), x, y));
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

  redraw(canvas, context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (this.img != null) {
      context.drawImage(this.img, 0, 0);
    }
    for (let action of this.actions) {
      action.doAction(canvas, context);
    }
  }

  undo(canvas, context) {
    this.actions.pop();
    this.redraw(canvas, context);
  }
}
