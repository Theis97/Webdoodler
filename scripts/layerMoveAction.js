/*
 * Keeps a record of a single move up or down of a layer in the layer hierarchy
 */
class LayerMoveAction extends Action {
  constructor(id, direction) {
    super();
    this.id = id;
    this.direction = direction;
  }

  doAction(layerManager) {
    layerManager.moveLayer(this.id, this.direction);
  }
}
