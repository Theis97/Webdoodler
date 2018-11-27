class LayerManager {
  constructor() {
    this.layers = [];
    this.nextId = 0;
    this.addLayer();
    this.activeLayerIndex = 0;
    this.layers[0].markActiveState(true);
  }

  updateActiveLayer(idToActivate) {
    if(this.activeLayerIndex < this.layers.length) {
      this.layers[this.activeLayerIndex].markActiveState(false);
    }
    for (var i = 0; i < this.layers.length; i++) {
      var currLayer = this.layers[i];
      if(currLayer.id === idToActivate) {
        this.activeLayerIndex = i;
        currLayer.markActiveState(true);
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

  removeLayer(idToRemove) {
    for (var i = 0; i < this.layers.length; i++) {
      var currLayer = this.layers[i];
      if(currLayer.id === idToRemove) {
        if(this.activeLayerIndex > i) {
          this.activeLayerIndex--;
        }
        this.layers.splice(i, 1);
        break;
      }
    }
  }
}
