/*
 * A tool for drawing line segments
 */
class Line extends Tool {
  constructor(colorPicker) {
    super();
    this.colorPicker = colorPicker;
    this.isPainting = false;
    this.shouldRecord = false;
    this.startX = 0;
    this.startY = 0;
    this.size = 10;
    this.color = '#' + colorPicker.jscolor;
  }

  copy() {
    var copy = new Line(this.colorPicker);
    copy.isPainting = this.isPainting;
    copy.shouldRecord = this.shouldRecord;
    copy.lastX = this.lastX;
    copy.lastY = this.lastY;
    copy.size = this.size;
    copy.color = this.color;
    return copy;
  }

  setLastPos(newX, newY) {
    this.startX = newX;
    this.startY = newY;
  }

  draw(context, x, y) {
    context.beginPath();
    context.moveTo(this.startX, this.startY);
    context.lineTo(x, y);
    context.lineWidth = this.size;
    context.lineCap = "round";
    context.strokeStyle = this.color;
    context.stroke();
  }

  changeColor(color) {
    this.color = color;
  }

  changeSize(size) {
    this.size = size;
  }

  onMove(context, x, y) {
    this.shouldRecord = false;
    if(this.isPainting) {
      var UIlayer = document.getElementById("UILayer");
      var previewContext = UILayer.getContext("2d");
      previewContext.clearRect(0, 0, UILayer.width, UILayer.height);
      this.draw(previewContext, x, y);
    }
  }

  onDown(context, x, y) {
    this.shouldRecord = true;
    this.isPainting = true;
    this.setLastPos(x, y);
  }

  onUp(context, x, y) {
    this.isPainting = false;
    this.shouldRecord = true;
    this.draw(context, x, y);
  }

  onLeave(context, x, y) {
    this.isPainting = false;
    var UIlayer = document.getElementById("UILayer");
    var previewContext = UILayer.getContext("2d");
    previewContext.clearRect(0, 0, UILayer.width, UILayer.height);
  }

  isRecorded() {
    return this.shouldRecord;
  }
}
