/**
 * 画布引擎
 */
class CanvasEngine {

  constructor(props) {
    this.width = 0;
    this.height = 0;
    this.background = null;
    this.markList = [];
    Object.assign(this, props);
  }

  render(ctx) {
    const {width, height, background, markList} = this;
    ctx.save();

    function markListRender() {
      markList.forEach(mark => {
        mark.render(ctx);
      });
      ctx.restore();
    }

    if (background != null) {
      background.render(ctx, markListRender);
    } else {
      markListRender();
    }
  }

  setBackground(background) {
    this.background = background;
  }

  addMark(mark) {
    this.markList.push(mark);
    return true;
  }

  removeMark(mark) {
    const index = this.markList.findIndex(({id}) => id === mark.id);
    this.markList.splice(index, 1);
    return index > -1;
  }

  updateMark(mark) {
    const index = this.markList.findIndex(({id}) => id === mark.id);
    this.markList.splice(index, 1, mark);
    return index > -1;
  }
}