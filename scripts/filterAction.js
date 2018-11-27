class FilterAction extends Action  {
  constructor(layerId, filter) {
    super();
    this.layerId = layerId;
    this.filter = filter;
  }

  doAction(layerManager) {
    var layer = layerManager.getLayer(this.layerId);
    var canvas = layer.canvas;
    var context = canvas.getContext("2d");
    this.filter(canvas, context);
  }
}
