class LayerDeleteAction extends Action {
  constructor(id) {
    super();
    this.id = id;
  }

  doAction(layerManager) {
    layerManager.removeLayer(this.id);
  }
}
