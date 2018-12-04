var testLayerManager;

function runTests() {
  testMoveLayer();
}

function testMoveLayer() {
  testLayerManager.reset();
  testLayerManager.addLayer();
  testLayerManager.moveLayer(0, 1);

  var layer0 = testLayerManager.getLayer(0);
  if(layer0.canvas.style.zIndex == 1) {
    console.log("Test PASSED: testMoveLayer");
  } else {
    console.log("Test FAILED: testMoveLayer");
  }
}
