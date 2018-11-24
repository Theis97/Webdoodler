function changeCanvasSize(canvas, width, height) {
	canvas.width = width;
	canvas.height = height;
}

function loadImage(canvas, context, imgFile) {
  var reader = new FileReader();
  var img = new Image();

  reader.addEventListener("load", function () {
    img.src = reader.result;
    img.onload = function() {
      changeCanvasSize(canvas, img.width, img.height);
      context.drawImage(img, 0, 0);
    };
  }, false);

  reader.readAsDataURL(imgFile);
}
