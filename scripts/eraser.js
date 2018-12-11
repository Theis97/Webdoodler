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
    var offset = Math.floor(this.size/2);
    var startX = x - offset;
    var startY = y - offset;

    var pixels = context.getImageData(startX, startY, this.size, this.size);

    for (var i = 0; i < pixels.data.length; i += 4) {
      pixels.data[i + 3] = 0; // alpha
    }
    
    context.putImageData(pixels, startX, startY);

    this.setLastPos(x, y);
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
