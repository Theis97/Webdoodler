/*
 * Keeps a record of the removal of a single layer to the doodle
 */
class LayerDeleteAction extends Action {
  constructor(id) {
    super();
    this.id = id;
  }

  doAction(layerManager) {
    layerManager.removeLayer(this.id);
  }
}
