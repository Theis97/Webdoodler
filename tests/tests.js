var testLayerManager;

function runTests() {
  testMoveLayer();
}

function testMoveLayer() {
  testLayerManager.reset();
  testLayerManager.addLayer();

  var layer0 = testLayerManager.getLayer(0);
  var layer1 = testLayerManager.getLayer(1);

  var oldLayer1zIndex = layer1.canvas.style.zIndex;

  testLayerManager.moveLayer(0, 1);

  if(layer0.canvas.style.zIndex == oldLayer1zIndex) {
    console.log("Test PASSED: testMoveLayer");
  } else {
    console.log("Test FAILED: testMoveLayer");
  }
}
