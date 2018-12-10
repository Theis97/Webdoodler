/*
 * Moves the selection made previously with the selection tool to a
 * new position on the same layer.
 */
class MoveSelection extends Tool {
  constructor() {
    super();
    this.isMoving = false;
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

  preview(origContext, x, y) {
    // TODO: refactor this
    var UILayer = document.getElementById("UILayer");
    var previewContext = UILayer.getContext("2d");
    previewContext.clearRect(0, 0, UILayer.width, UILayer.height);

    var selectionWidth = bottomRightX - topLeftX;
    var selectionHeight = bottomRightY - topLeftY;

    var selection = document.createElement('canvas');
    selection.width = selectionWidth;
    selection.height = selectionHeight;
    var selectionCtx = selection.getContext("2d");

    var selectedPixels = origContext.getImageData(topLeftX, topLeftY,
                                              selectionWidth, selectionHeight);
    selectionCtx.putImageData(selectedPixels, 0, 0);

    var newX = topLeftX + (x - this.startX);
    var newY = topLeftY + (y - this.startY);

    previewContext.drawImage(selection, newX, newY);
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
    if(this.isMoving) {
      this.preview(context, x, y);
    }
  }

  onDown(context, x, y) {
    this.shouldRecord = true;
    this.isMoving = true;
    this.setLastPos(x, y);
  }

  onUp(context, x, y) {
    this.shouldRecord = true;
    this.isMoving = false;
    this.draw(context, x, y);
    previewSelection();
  }

  onLeave(context, x, y) {
    this.isMoving = false;
    var UILayer = document.getElementById("UILayer");
    var previewContext = UILayer.getContext("2d");
    previewContext.clearRect(0, 0, UILayer.width, UILayer.height);
  }

  isRecorded() {
    return this.shouldRecord;
  }
}
