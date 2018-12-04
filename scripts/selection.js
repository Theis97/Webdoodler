class Selection extends Tool {
  constructor() {
    super();
    this.startX = 0;
    this.startY = 0;
    this.isSelecting = false;
  }

  copy() {
    var copy = new Selection();
    copy.startX = this.startX;
    copy.startY = this.startY;
    return copy;
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

  onDown(context, x, y) {
    this.isSelecting = true;
    this.startX = x;
    this.startY = y;
  }

  onUp(context, x, y) {
    this.isSelecting = false;
    this.recordSelection(x, y);
  }

  onLeave(context, x, y) {
    if(this.isSelecting) {
      this.recordSelection(x, y);
    }
  }

  isRecorded() {
    return false;
  }
}
