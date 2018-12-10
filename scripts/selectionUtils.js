function previewSelection() {
    var UILayer = document.getElementById("UILayer");
    var context = UILayer.getContext("2d");
    context.clearRect(0, 0, UILayer.width, UILayer.height);
    var selectionWidth = bottomRightX - topLeftX;
    var selectionHeight = bottomRightY - topLeftY;

    context.beginPath();
    context.rect(topLeftX, topLeftY, selectionWidth, selectionHeight);
    context.fillStyle = "rgba(0, 0, 0, 0)";
    context.fill();
    context.lineWidth = 3;
    context.strokeStyle = 'black';
    context.stroke();

    context.rect(topLeftX, topLeftY, selectionWidth, selectionHeight);
    context.fillStyle = "rgba(0, 0, 0, 0)";
    context.fill();
    context.lineWidth = 1;
    context.strokeStyle = 'white';
    context.stroke();
}
