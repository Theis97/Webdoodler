function brighten(canvas, context) {
  var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < imageData.data.length; i+= 4) {
    imageData.data[i] *= 1.2; // r
    imageData.data[i + 1] *= 1.2; // g
    imageData.data[i + 2] *= 1.2; // b
  }
  context.putImageData(imageData, 0, 0);
}

function blur(canvas, context) {
  var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < imageData.data.length; i+= 4) {
    var neighbors = [];
    neighbors.push(i - 4); // left
    neighbors.push(i + 4); // right
    neighbors.push(i - (4 * canvas.width)); // up (?)
    neighbors.push(i + (4 * canvas.width)); // down (?)

    var rSum = imageData.data[i];
    var gSum = imageData.data[i + 1];
    var bSum = imageData.data[i + 2];
    var numInBoundPixels = 1;

    for(let pixelStart of neighbors) {
      var isTransparent = imageData.data[pixelStart + 3] <= 0;
      if(pixelStart >= 0 && !isTransparent) {
        rSum += imageData.data[pixelStart];
        gSum += imageData.data[pixelStart + 1];
        bSum += imageData.data[pixelStart + 2];
        numInBoundPixels++;
      }
    }

    imageData.data[i] = rSum/numInBoundPixels; // r
    imageData.data[i + 1] = gSum/numInBoundPixels; // g
    imageData.data[i + 2] = bSum/numInBoundPixels; // b
  }
  context.putImageData(imageData, 0, 0);
}
