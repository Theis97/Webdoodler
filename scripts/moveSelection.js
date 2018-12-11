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
    this.selection = null;
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

  copySelection(context, width, height) {
    this.selection = document.createElement('canvas');
    this.selection.width = width;
    this.selection.height = height;
    var selectionCtx = this.selection.getContext("2d");

    var selectedPixels = context.getImageData(topLeftX, topLeftY,
                                              width, height);
    selectionCtx.putImageData(selectedPixels, 0, 0);
  }

  // Overwrites pixels from the old location with transparent pixels
  overwriteOldPixels(context, width, height) {
    var selectedPixels = context.getImageData(topLeftX, topLeftY,
                                              width, height);
    for (var i = 0; i < selectedPixels.data.length; i += 4) {
      selectedPixels.data[i + 3] = 0; // alpha
    }
    context.putImageData(selectedPixels, topLeftX, topLeftY);
  }

  placeSelection(context, x, y) {
    var selectionWidth = bottomRightX - topLeftX;
    var selectionHeight = bottomRightY - topLeftY;

    // replace pixels in new location with selected pixels
    var newX = topLeftX + (x - this.startX);
    var newY = topLeftY + (y - this.startY);

    context.drawImage(this.selection, newX, newY);

    // Update selection coordinates
    topLeftX = newX;
    topLeftY = newY;
    bottomRightX = newX + selectionWidth;
    bottomRightY = newY + selectionHeight;
  }

  preview(origContext, x, y) {
    var UILayer = document.getElementById("UILayer");
    var previewContext = UILayer.getContext("2d");
    previewContext.clearRect(0, 0, UILayer.width, UILayer.height);

    var selectionWidth = bottomRightX - topLeftX;
    var selectionHeight = bottomRightY - topLeftY;

    var newX = topLeftX + (x - this.startX);
    var newY = topLeftY + (y - this.startY);

    previewContext.drawImage(this.selection, newX, newY);
  }

  // Only used when redrawing the doodle after undoing an action
  draw(context, x, y) {
    var selectionWidth = bottomRightX - topLeftX;
    var selectionHeight = bottomRightY - topLeftY;

    this.copySelection(context, selectionWidth, selectionHeight);
    this.overwriteOldPixels(context, selectionWidth, selectionHeight);
    this.placeSelection(context, x, y);
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

    var selectionWidth = bottomRightX - topLeftX;
    var selectionHeight = bottomRightY - topLeftY;

    this.copySelection(context, selectionWidth, selectionHeight);
    this.overwriteOldPixels(context, selectionWidth, selectionHeight);
    this.preview(context, x, y);
  }

  onUp(context, x, y) {
    this.shouldRecord = true;
    this.isMoving = false;

    this.placeSelection(context, x, y);
    outlineSelection();
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
