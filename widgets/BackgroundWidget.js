class BackgroundWidget extends RectWidget {

  constructor(props) {
    super(props);
    this.src = '';
    this.offsetX = 2;
    this.offsetY = 6;
    Object.assign(this, props);
  }

  render(ctx, callback) {
    const {x, y, w, h, src, scale, offsetX, offsetY} = this;
    const {dx, dy} = this.offsetWithoutScale(offsetX, offsetY);
    const img = new Image();
    img.src = src;
    img.onload = function () {
      ctx.save();
      ctx.drawImage(img, x + dx, y + dy, w / scale, h / scale);
      ctx.restore();
      callback && callback();
    }
  }

  offsetWithoutScale(offsetX, offsetY) {
    const {scale} = this;
    return {
      dx: offsetX / scale,
      dy: offsetY / scale,
    };
  }
}