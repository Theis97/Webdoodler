/*
 * Keeps a record of a single instance of a layer being activated
 */
class LayerSelectAction extends Action {
  constructor(id) {
    super()
    this.id = id;
  }

  doAction(layerManager) {
    layerManager.updateActiveLayer(this.id);
  }
}
