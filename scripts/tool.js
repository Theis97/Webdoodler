class Tool {
  constructor(){}
  copy(){}
  draw(context, x, y){}
  changeColor(color){}
  changeSize(size){}

  /*
   * The following functions are called on the currently selected tool
   * when the canvas recieves the relevant pointer event
   */
  onMove(context, x, y){}
  onDown(context, x, y){}
  onUp(context, x, y){}
  onLeave(context, x, y){}

  isRecorded(){}
}
