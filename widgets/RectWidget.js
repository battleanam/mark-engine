/**
 * 矩形组件实例
 */
class RectWidget {

  constructor(props) {
    this.x = 0; // 起点
    this.y = 0;
    this.w = 0;
    this.h = 0;
    this.scale = 1;
    Object.assign(this, props);
  }

  render(ctx) {
    const {x, y, w, h, scale} = this;
    ctx.save();
    ctx.fillRect(x, y, w / scale, h / scale);
    ctx.restore();
  }


  setScale(scale) {
    this.scale = scale;
    return this;
  }
}