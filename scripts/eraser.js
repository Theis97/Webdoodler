class Eraser extends Tool {
  constructor() {
    super();
    this.isPainting = false;
    this.lastX = 0;
    this.lastY = 0;
    this.size = 10;
  }

  copy() {
    var copy = new Eraser();
    copy.isPainting = this.isPainting;
    copy.lastX = this.lastX;
    copy.lastY = this.lastY;
    copy.size = this.size;
    return copy;
  }

  setLastPos(newX, newY) {
    this.lastX = newX;
    this.lastY = newY;
  }

  draw(context, x, y) {
    context.beginPath();
    context.moveTo(this.lastX, this.lastY);
    context.lineTo(x, y);
    context.lineWidth = this.size;
    context.lineCap = "round";
    context.globalCompositeOperation = "destination-out";
    context.stroke();

    this.setLastPos(x, y);
    context.globalCompositeOperation = "source-over";
  }


  changeSize(size) {
    this.size = size;
  }

  onMove(context, x, y) {
    if(this.isPainting) {
      this.draw(context, x, y);
    }
    this.setLastPos(x, y);
  }

  onDown(context, x, y) {
    this.isPainting = true;
    this.setLastPos(x, y);
  }

  onUp(context, x, y) {
    this.isPainting = false;
  }

  onLeave(context, x, y) {
    if(this.isPainting) {
      this.draw(context, x, y);
    }
    this.isPainting = false;
  }

  isRecorded() {
    return this.isPainting;
  }
}
