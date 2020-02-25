class BackgroundWidget extends RectWidget {

  constructor(props) {
    super();
    this.src = '';
    this.offsetX = 0;
    this.offsetY = 0;
    Object.assign(this, props);
  }

  render(ctx, callback) {
    const {x, y, w, h, src, scale, offsetX, offsetY} = this;
    const img = new Image();
    img.src = src;
    img.onload = function () {
      ctx.save();
      ctx.drawImage(img, x + offsetX, y + offsetY, w / scale, h / scale);
      ctx.restore();
      callback && callback();
    }
  }

}