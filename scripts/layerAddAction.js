/*
 * Keeps a record of the addition of a single layer to the doodle
 */
class LayerAddAction extends Action {
  constructor() {
    super();
  }

  doAction(layerManager) {
    layerManager.addLayer();
  }
}
