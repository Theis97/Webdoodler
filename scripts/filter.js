function applyFilter(canvas, context) {
  var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < imageData.data.length; i+= 4) {
    imageData.data[i] *= 1.2; // r
    imageData.data[i + 1] *= 1.2; // g
    imageData.data[i + 2] *= 1.2; // b
  }
  context.putImageData(imageData, 0, 0);
}
