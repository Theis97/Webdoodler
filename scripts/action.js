/*
 * Keeps a record of a single action (for example, a single brushstroke)
 * made by the user.
 */
class Action {
  constructor(tool, startX, startY) {
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

  doAction(context) {
    this.tool.setLastPos(this.coordList[0].x, this.coordList[0].y);
    for (let coord of this.coordList.slice(1)) {
      this.tool.draw(context, coord.x, coord.y);
    }
  }
}
