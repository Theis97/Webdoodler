/*
 * A class that facilitates the creation, deletion, and switching of layers
 */
class LayerManager {
  constructor(width, height, actionHandler) {
    this.actionHandler = actionHandler;
    this.layers = [];
    this.nextId = 0;
    this.doodleWidth = width;
    this.doodleHeight = height;
    this.addLayer();
    this.activeLayerIndex = 0;
    this.layers[0].markActiveState(true);
  }

  reset(width, height) {
    this.doodleWidth = width;
    this.doodleHeight = height;

    while(this.layers.length > 0) {
      var currLayer = this.layers.pop();
      currLayer.removeUI();
    }
    this.nextId = 0;
    this.addLayer();
    this.activeLayerIndex = 0;
    this.layers[0].markActiveState(true);
  }

  getActiveLayer() {
    return this.layers[this.activeLayerIndex];
  }

  getLayer(id) {
    return this.layers.find(function(element) {
      return element.id == id;
    });
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
    var newLayer = new Layer(this.nextId, this.doodleWidth, this.doodleHeight,
                             this, this.actionHandler);

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
        currLayer.removeUI();
        this.layers.splice(i, 1);
        break;
      }
    }
  }

  clearLayers() {
    for (let layer of this.layers) {
      layer.clear();
    }
  }

  setBackgroundImgLayer(img) {
    this.layers[0].canvas.getContext("2d").drawImage(img, 0, 0);
  }
}
