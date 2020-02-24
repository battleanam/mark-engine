/**
 * 矩形组件实例
 */
class RectWidget {

  constructor(props) {
    this.x = 0; // 起点
    this.y = 0;
    this.w = 0;
    this.h = 0;
    Object.assign(this, props);
  }

  render(ctx) {
    const {x, y, w, h} = this;
    ctx.save();
    ctx.fillRect(x, y, w, h);
    ctx.restore();
  }
}