class LayerManager {
  constructor() {
    this.layers = [];
    this.nextId = 0;
    this.addLayer();
  }

  addLayer() {
    var newLayer = new Layer(this.nextId);

    var canvasContainer = document.getElementById('doodle');
    canvasContainer.appendChild(newLayer.canvas);

    var layerList = document.getElementById('layerList');
    if (this.layers.length > 0) {
      var oldTopLayer = this.layers[this.layers.length - 1];
      layerList.insertBefore(newLayer.listItem, oldTopLayer.listItem);
    } else {
      layerList.appendChild(newLayer.listItem);
    }

    this.layers.push(newLayer);
    this.nextId++;
  }
}
