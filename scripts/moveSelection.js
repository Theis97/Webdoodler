class MoveSelection extends Tool {
  constructor() {
    super();
    this.startX = 0;
    this.startY = 0;
    this.shouldRecord = false;
  }

  copy() {
    var copy = new MoveSelection();
    copy.setLastPos(this.startX, this.startY);
    copy.shouldRecord = this.shouldRecord;
    return copy;
  }

  setLastPos(newX, newY) {
    this.startX = newX;
    this.startY = newY;
  }

  draw(context, x, y) {
    // copy selected pixels
    var selectionWidth = bottomRightX - topLeftX;
    var selectionHeight = bottomRightY - topLeftY;

    var selection = document.createElement('canvas');
    selection.width = selectionWidth;
    selection.height = selectionHeight;
    var selectionCtx = selection.getContext("2d");

    var selectedPixels = context.getImageData(topLeftX, topLeftY,
                                              selectionWidth, selectionHeight);
    selectionCtx.putImageData(selectedPixels, 0, 0);

    // replace pixels in old location with transparent pixels
    for (var i = 0; i < selectedPixels.data.length; i+= 4) {
      selectedPixels.data[i + 3] = 0; // alpha
    }
    context.putImageData(selectedPixels, topLeftX, topLeftY);

    // replace pixels in new location with selected pixels
    var newX = topLeftX + (x - this.startX);
    var newY = topLeftY + (y - this.startY);

    context.drawImage(selection, newX, newY);

    // Update selection coordinates
    topLeftX = newX;
    topLeftY = newY;
    bottomRightX = newX + selectionWidth;
    bottomRightY = newY + selectionHeight;
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
