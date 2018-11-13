 class Eyedropper {
   constructor(colorPicker) {
     this.colorPicker = colorPicker;
     this.color = '#' + colorPicker.jscolor;
     this.r = 0;
     this.g = 0;
     this.b = 0;
   }

   copy() {
     var copy = new Eyedropper(this.colorPicker);
     copy.r = this.r;
     copy.g = this.g;
     copy.b = this.b;
     return copy;
   }

   onDown(context, x, y) {
     var pixel = context.getImageData(x, y, 1, 1);
     this.r = pixel.data[0];
     this.g = pixel.data[1];
     this.b = pixel.data[2];
   }

   onUp(context, x, y) {
     this.colorPicker.jscolor.fromRGB(this.r, this.g, this.b);
   }

   isRecorded() {
     return false;
   }

   draw(context, x, y) {
     // do nothing
   }

   changeColor(color) {
     // do nothing
   }

   changeSize(size) {
     // do nothing
   }

   onMove(context, x, y) {
     // do nothing
   }

   onLeave(context, x, y) {
     // do nothing
   }

 }
