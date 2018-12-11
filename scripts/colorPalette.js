class ColorPalette {
  constructor(colorPicker) {
    this.colorPicker = colorPicker;
    this.list = document.getElementById('palette');
    for (var i = 0; i < 4; i++) {
      this.addColorSlot();
    }
  }

  addColorSlot() {
    var colorSlot = document.createElement('li');
    var colorPicker = this.colorPicker;

    var loadColorButton = document.createElement('button');
    loadColorButton.classList.add('colorButton');
    loadColorButton.addEventListener('click', function(event) {
      var color = this.style.backgroundColor;
      colorPicker.jscolor.fromString(color);
      currTool.changeColor(color);
    });

    var saveColorButton = document.createElement('button');
    saveColorButton.textContent = "Save Color";
    saveColorButton.classList.add('saveColorButton');
    saveColorButton.addEventListener('click', function(event) {
      loadColorButton.style.backgroundColor = '#' + colorPicker.jscolor;
    });

    colorSlot.appendChild(saveColorButton);
    colorSlot.appendChild(loadColorButton);

    this.list.appendChild(colorSlot);
  }
}
