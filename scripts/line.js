/*
 * A tool for drawing line segments
 */
class Line extends Tool {
  constructor(colorPicker) {
    super();
    this.colorPicker = colorPicker;
    this.shouldRecord = false;
    this.startX = 0;
    this.startY = 0;
    this.size = 10;
    this.color = '#' + colorPicker.jscolor;
  }

  copy() {
    var copy = new Line(this.colorPicker);
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
  }

  onDown(context, x, y) {
    this.shouldRecord = true;
    this.setLastPos(x, y);
  }

  onUp(context, x, y) {
    this.shouldRecord = true;
    this.draw(context, x, y);
  }

  isRecorded() {
    return this.shouldRecord;
  }
}
