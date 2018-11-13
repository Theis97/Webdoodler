/*
 * Keeps track of all changes the user has made to the canvas, can revert
 * canvas to previous states.
 */
class ActionHandler {
  constructor() {
    this.actions = [];
    this.recording = false;
  }

  setRecording(recording) {
    this.recording = recording;
  }

  addNewAction(tool, x, y) {
    if(tool.isRecorded()) {
      this.recording = true;
      this.actions.push(new Action(tool.copy(), x, y));
    }
  }

  updateCurrentAction(x, y) {
    if(this.recording) {
      this.actions[this.actions.length - 1].addCoord(x, y);
    }
  }

  actionInterrupted(x, y) {
    if(this.recording) {
      this.actions[this.actions.length - 1].addCoord(x, y);
      this.recording = false;
    }
  }

  redraw(canvas, context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let action of this.actions) {
      action.doAction(context);
    }
  }

  undo(canvas, context) {
    this.actions.pop();
    this.redraw(canvas, context);
  }
}
