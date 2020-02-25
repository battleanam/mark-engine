/**
 * 标注框组件
 */
class MarkWidget extends RectWidget{

  constructor(props) {
    super();
    this.color = 'red';
    this.width = 1;
    this.scale = 1;
    Object.assign(this, props);
  }

  render(ctx) {
    const {color, width, x, y, w, h, scale, offsetX, offsetY} = this;
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.strokeRect(x + offsetX, y + offsetY, w / scale, h / scale);
    ctx.restore();
  }

}