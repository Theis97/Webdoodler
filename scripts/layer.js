class Layer {
  constructor(id) {
    this.id = id;
    this.canvas = null;
    this.listItem = null;
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
    this.listItem.appendChild(makeActiveButton);

    var deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";
    this.listItem.appendChild(deleteButton);
  }
}
