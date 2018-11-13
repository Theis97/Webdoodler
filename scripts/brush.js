class Brush {
  constructor() {
    this.isPainting = false;
    this.lastX = 0;
    this.lastY = 0;
    this.size = 10;
    this.color = '#000000';
  }

  copy() {
    var copy = new Brush();
    copy.isPainting = this.isPainting;
    copy.lastX = this.lastX;
    copy.lastY = this.lastY;
    copy.size = this.size;
    copy.color = this.color;
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
    context.strokeStyle = this.color;
    context.stroke();

    this.setLastPos(x, y);
  }

  changeColor(color) {
    this.color = color;
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
}
