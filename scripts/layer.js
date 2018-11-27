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
    this.listItem = document.createElement('li');
    this.listItem.id = "layer" + id + "Listing";

    var label = document.createElement('label');
    label.textContent = "Layer " + id;
    this.listItem.appendChild(label);

    var makeActiveButton = document.createElement('button');
    makeActiveButton.textContent = "Make Active";
    var layerManager = this.layerManager;
    var id = this.id;
    makeActiveButton.addEventListener('click', function(event){
      layerManager.updateActiveLayer(id);
    });
    this.listItem.appendChild(makeActiveButton);

    var deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";
    this.listItem.appendChild(deleteButton);
  }

  markActiveState(isActive) {
    this.isActive = isActive;
    this.listItem.classList.toggle('layerSelected');
  }
}
