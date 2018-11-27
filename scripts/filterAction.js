class FilterAction extends Action  {
  constructor(filter) {
    super();
    this.filter = filter;
  }

  doAction(canvas, context) {
    this.filter(canvas, context);
  }
}
