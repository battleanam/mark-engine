/**
 * 标注框组件
 */
class MarkWidget extends RectWidget{

  constructor(props) {
    super(props);
    this.color = 'red';
    this.width = 1;
    Object.assign(this, props);
  }

  render(ctx) {
    const {color, width, x, y, w, h} = this;
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.strokeRect(x, y, w, h);
    ctx.restore();
  }
}