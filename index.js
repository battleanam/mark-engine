const marker = document.getElementById('marker');
const ctx = marker.getContext('2d');
const markerCache = document.createElement('canvas');
markerCache.width = marker.width;
markerCache.height = marker.height;
const cacheCtx = markerCache.getContext('2d');
// document.body.append(markerCache)

const canvasEngine = new CanvasEngine({
  width: 600,
  height: 400
});

const background = new BackgroundWidget({
  x: 0,
  y: 0,
  w: 600,
  h: 400,
  src: './assets/img/bug.jpg'
});

const mark = new MarkWidget({
  x: 1,
  y: 1,
  w: 100,
  h: 100,
  color: 'red',
  width: '2'
});

canvasEngine.setBackground(background);
canvasEngine.addMark(mark);
canvasEngine.render(ctx);

// let i = 0;

marker.addEventListener('mousewheel', function ({wheelDelta}) {
  const scale = canvasEngine.scale - wheelDelta / 1200;
  // i = (i + 1) % 2;
  if (scale >= .1 && scale <= 5) {
    canvasEngine.setScale(scale);
  }
  // if (i === 0) {
  //   canvasEngine.clear(cacheCtx).render(cacheCtx);
  // } else {
    canvasEngine.clear(ctx).render(ctx);
    // ctx.drawImage(markerCache, 0, 0);
  // }
});

console.log(canvasEngine);