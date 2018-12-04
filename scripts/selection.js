/*
 * A tool that selects a rectangular part of a layer.
 */
class Selection extends Tool {
  constructor() {
    super();
    this.startX = 0;
    this.startY = 0;
    this.isSelecting = false;
    this.shouldRecord = false;
  }

  copy() {
    var copy = new Selection();
    copy.setLastPos(this.startX, this.startY);
    copy.isSelecting = this.isSelecting;
    copy.shouldRecord = this.shouldRecord;
    return copy;
  }

  setLastPos(newX, newY) {
    this.startX = newX;
    this.startY = newY;
  }

  draw(context, x, y) {
    this.recordSelection(x, y);
  }

  recordSelection(lastX, lastY) {
    if(this.startX < lastX) {
      topLeftX = this.startX;
      bottomRightX = lastX;
    } else {
      topLeftX = lastX;
      bottomRightX = this.startX;
    }

    if(this.startY < lastY) {
      topLeftY = this.startY;
      bottomRightY = lastY;
    } else {
      topLeftY = lastY;
      bottomRightY = this.startY;
    }
  }

  onMove(context, x, y) {
    this.shouldRecord = false;
  }

  onDown(context, x, y) {
    this.shouldRecord = true;
    this.isSelecting = true;
    this.setLastPos(x,y);
  }

  onUp(context, x, y) {
    this.shouldRecord = true;
    this.isSelecting = false;
    this.recordSelection(x, y);
  }

  onLeave(context, x, y) {
    if(this.isSelecting) {
      this.shouldRecord = true;
      this.isSelecting = false;
      this.recordSelection(x, y);
    }
  }

  isRecorded() {
    return this.shouldRecord;
  }
}
