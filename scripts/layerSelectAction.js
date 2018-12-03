class LayerSelectAction extends Action {
  constructor(id) {
    super()
    this.id = id;
  }

  doAction(layerManager) {
    layerManager.updateActiveLayer(this.id);
  }
}
