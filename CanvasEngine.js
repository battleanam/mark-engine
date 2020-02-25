/**
 * 画布引擎
 */

class CanvasEngine extends RectWidget {

   constructor(props) {
    super();
    this.width = 0;
    this.height = 0;
    this.scale = 1;
    this.background = null;
    this.markList = [];
    Object.assign(this, props);
    this.initCache();

  }

  initCache() {
    this.markerCache = [
      document.createElement('canvas'),
      document.createElement('canvas'),
    ];
    this.cacheCtx = [];

    this.markerCache.forEach((cache, index) => {
      cache.width = marker.width;
      cache.height = marker.height;
      this.cacheCtx[index] = cache.getContext('2d');
      document.body.append(cache);
    });

    this.i = 0;
  }

  renderCache(ctx) {
    const {scale, background, markList, offsetX, offsetY} = this;
    ctx.save();

    function markListRender() {
      markList.forEach(mark => {
        mark.move({offsetX, offsetY}).setScale(scale).render(ctx);
      });
      ctx.restore();
    }

    if (background != null) {
      background.move({offsetX, offsetY}).setScale(scale).render(ctx, markListRender);
    } else {
      markListRender();
    }
  }

  render(ctx, cacheIndex) {
    const {markerCache, cacheCtx, scale, offsetX, offsetY} = this;
    if (cacheIndex === -1) {
      this.renderWithSettings(1, null, ctx);
    } else if (cacheIndex >= 0) {
      ctx.drawImage(markerCache[cacheIndex], 0, 0);
    }
    this.i = (this.i + 1) % 2;
    if (isNaN(cacheIndex)) {
      ctx.drawImage(markerCache[this.i], 0, 0);
      this.renderWithSettings(null, {offsetX, offsetY}, cacheCtx[1 - this.i]);
    } else {
      this.renderWithSettings(scale + .1, null, cacheCtx[0]);
      this.renderWithSettings(scale - .1, null, cacheCtx[1]);
    }
  }

  prepareDrag() {
    const {cacheCtx, offsetX, offsetY} = this;
    this.renderWithSettings(null, {offsetX, offsetY}, cacheCtx[0]);
    this.renderWithSettings(null, {offsetX, offsetY}, cacheCtx[1]);
    this.move({offsetX, offsetY});
  }

  prepareZoom() {
    const {cacheCtx, scale} = this;
    this.renderWithSettings(scale + .1, null, cacheCtx[0]);
    this.renderWithSettings(scale - .1, null, cacheCtx[1]);
    this.setScale(scale);
  }

  renderWithSettings(scale, offset, ctx) {
    scale && this.setScale(scale);
    offset && this.move(offset);
    this.clear(ctx).renderCache(ctx);
  }

  updateLocation() {
    const {offsetX, offsetY} = this;
    this.x += offsetX;
    this.y += offsetY;
    this.background.updateLocation();
    this.markList.forEach(mark => {
      mark.updateLocation();
    })
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