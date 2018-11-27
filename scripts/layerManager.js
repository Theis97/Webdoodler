class LayerManager {
  constructor() {
    this.layers = [];
    this.nextId = 0;
    this.activeLayerIndex = -1;
    this.addLayer();
    this.updateActiveLayer(0);
  }

  updateActiveLayer(idToActivate) {
    if(this.activeLayerIndex != -1) {
      this.layers[this.activeLayerIndex].markActiveState(false, 'none');
    }
    for (var i = 0; i < this.layers.length; i++) {
      var currLayer = this.layers[i];
      if(currLayer.id === idToActivate) {
        this.activeLayerIndex = i;
        currLayer.markActiveState(true, 'green');
      }
    }
  }

  addLayer() {
    var newLayer = new Layer(this.nextId, this);

    var canvasContainer = document.getElementById('doodle');
    canvasContainer.appendChild(newLayer.canvas);

    var layerList = document.getElementById('layerList');
    if(this.layers.length > 0) {
      var oldTopLayer = this.layers[this.layers.length - 1];
      layerList.insertBefore(newLayer.listItem, oldTopLayer.listItem);
    } else {
      newLayer.isActive = true;
      layerList.appendChild(newLayer.listItem);
    }

    this.layers.push(newLayer);
    this.nextId++;
  }
}
