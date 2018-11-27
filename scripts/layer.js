class Layer {
  constructor(id, lm) {
    this.layerManager = lm;
    this.id = id;
    this.canvas = null;
    this.listItem = null;
    this.isActive = false;
    this.setupCanvas(id);
    this.setupListItem(id);
  }

  setupCanvas(id) {
    this.canvas = document.createElement('canvas');
    this.canvas.id = "layer" + id;
    this.canvas.width = 1200;
    this.canvas.height = 800;
    this.canvas.style.zIndex = id;
  }

  setupListItem(id) {
    var listItem = document.createElement('li');
    this.listItem = listItem;
    listItem.id = "layer" + id + "Listing";

    var label = document.createElement('label');
    label.textContent = "Layer " + id;
    listItem.appendChild(label);

    var makeActiveButton = document.createElement('button');
    makeActiveButton.textContent = "Make Active";
    var layerManager = this.layerManager;
    var id = this.id;
    makeActiveButton.addEventListener('click', function(event) {
      layerManager.updateActiveLayer(id);
    });
    listItem.appendChild(makeActiveButton);

    var deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";
    var canvas = this.canvas;
    deleteButton.addEventListener('click', function(event) {
      label.parentNode.removeChild(label);
      makeActiveButton.parentNode.removeChild(makeActiveButton);
      deleteButton.parentNode.removeChild(deleteButton);
      listItem.parentNode.removeChild(listItem);
      canvas.parentNode.removeChild(canvas);
      layerManager.removeLayer(id);
    });
    listItem.appendChild(deleteButton);
  }

  markActiveState(isActive) {
    this.isActive = isActive;
    if(isActive) {
      this.listItem.classList.add('layerSelected');
    } else {
      this.listItem.classList.remove('layerSelected');
    }
  }
}
