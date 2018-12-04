/*
 * Keeps a record of a single brushstoke made by the user.
 */
class Stroke extends Action {
  constructor(layerId, tool, startX, startY) {
    super();
    this.layerId = layerId;
    this.tool = tool;
    this.coordList = []
    this.addCoord(startX, startY);
  }

  addCoord(newX, newY) {
    this.coordList.push({
      x: newX,
      y: newY
    })
  }

  doAction(layerManager) {
    var layer = layerManager.getLayer(this.layerId);
    var context = layer.canvas.getContext("2d");

    this.tool.setLastPos(this.coordList[0].x, this.coordList[0].y);
    for (let coord of this.coordList.slice(1)) {
      this.tool.draw(context, coord.x, coord.y);
    }
  }
}
