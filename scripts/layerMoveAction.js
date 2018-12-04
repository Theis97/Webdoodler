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
