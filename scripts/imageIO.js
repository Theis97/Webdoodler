function changeSize(width, height) {
	var container = document.getElementById('doodle');
	container.style.width = "" + width + "px";
	container.style.height = "" + height + "px";
}

function loadImage(img, layerManager, imgFile) {
  var reader = new FileReader();

  reader.addEventListener("load", function () {
    img.src = reader.result;
    img.onload = function() {
			changeSize(img.width, img.height);
			layerManager.reset(img.width, img.height);
      layerManager.setBackgroundImgLayer(img);
    };
  }, false);

  reader.readAsDataURL(imgFile);
}

function saveDoodle() {
	// TODO
}
