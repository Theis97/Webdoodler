class LayerAddAction extends Action {
  constructor() {
    super();
  }

  doAction(layerManager) {
    layerManager.addLayer();
  }
}
