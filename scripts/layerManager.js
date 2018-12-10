/*
 * A class that facilitates the creation, deletion, and switching of layers
 */
class LayerManager {
  constructor(width, height, actionHandler) {
    this.actionHandler = actionHandler;
    this.UILayer = document.getElementById("UILayer");
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

    this.UILayer.width = width;
    this.UILayer.height = height;
    this.UILayer.style.zIndex = 1;

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

  getMergedCanvas() {
    var fullDoodle = document.createElement('canvas');
    fullDoodle.width = this.doodleWidth;
    fullDoodle.height = this.doodleHeight;
    var context = fullDoodle.getContext("2d");
    for (let layer of this.layers) {
      context.drawImage(layer.canvas, 0, 0);
    }
    return fullDoodle;
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
        this.UILayer.style.zIndex = (i * 2) + 1;
      }
    }
  }

  activeLayerPreview() {
    for (let layer of this.layers) {
      if(!layer.isActive) {
        layer.hide();
      }
    }
    setTimeout(this.showAllLayers.bind(this), 350);
  }

  showAllLayers() {
    for (let layer of this.layers) {
      layer.show();
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

  // direction
  // +1: up
  // -1: down
  moveLayer(idToMove, direction) {
    var layerList = document.getElementById('layerList');

    for (var i = 0; i < this.layers.length; i++) {
      var currLayer = this.layers[i];
      if(currLayer.id === idToMove) {
        var newIndex = i + direction;
        if(newIndex >= 0 && newIndex < this.layers.length) {
          var otherLayer = this.layers[newIndex];

          currLayer.canvas.style.zIndex = newIndex * 2;
          otherLayer.canvas.style.zIndex = i * 2;

          this.layers[newIndex] = currLayer;
          this.layers[i] = otherLayer;

          if(direction == 1) {
            layerList.removeChild(currLayer.listItem);
            layerList.insertBefore(currLayer.listItem, otherLayer.listItem);
          } else {
            layerList.removeChild(otherLayer.listItem);
            layerList.insertBefore(otherLayer.listItem, currLayer.listItem);
          }

          if(i === this.activeLayerIndex) {
            this.activeLayerIndex = newIndex;
          } else if (newIndex === this.activeLayerIndex) {
            this.activeLayerIndex = i;
          }

          break;
        }
      }
    }
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
