/**
 * 画布引擎
 */
class CanvasEngine {

  constructor(props) {
    this.width = 0;
    this.height = 0;
    this.scale = 1;
    this.background = null;
    this.markList = [];
    Object.assign(this, props);
  }

  render(ctx) {
    const {scale, background, markList} = this;
    ctx.save();

    function markListRender() {
      markList.forEach(mark => {
        mark.setScale(scale).render(ctx);
      });
      ctx.restore();
    }

    if (background != null) {
      background.setScale(scale).render(ctx, markListRender);
    } else {
      markListRender();
    }
  }

  setScale(scale) {
    this.scale = scale;
    return this;
  }

  clear(ctx) {
    const {width, height} = this;
    ctx.clearRect(0, 0, width, height);
    return this;
  }

  setBackground(background) {
    this.background = background;
    return this;
  }

  addMark(mark) {
    this.markList.push(mark);
    return this;
  }

  removeMark(mark) {
    const index = this.markList.findIndex(({id}) => id === mark.id);
    this.markList.splice(index, 1);
    return this;
  }

  updateMark(mark) {
    const index = this.markList.findIndex(({id}) => id === mark.id);
    this.markList.splice(index, 1, mark);
    return this;
  }
}