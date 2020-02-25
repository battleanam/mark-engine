const marker = document.getElementById('marker');
const ctx = marker.getContext('2d');

const markerCache = [
  document.createElement('canvas'),
  document.createElement('canvas'),
];
const cacheCtx = [];

markerCache.forEach((cache, index) => {
  cache.width = marker.width;
  cache.height = marker.height;
  cacheCtx[index] = cache.getContext('2d');
  // document.body.append(cache);
});


const canvasEngine = new CanvasEngine({
  width: 600,
  height: 400
});

const background = new BackgroundWidget({
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
canvasEngine.setScale(1.1).render(cacheCtx[0]);
canvasEngine.setScale(.9).render(cacheCtx[1]);
canvasEngine.setScale(1);


let i = 0;
let flag = 0;

marker.addEventListener('mousewheel', function ({wheelDelta}) {
  const delta = Math.abs(wheelDelta / 1200);
  const scale = canvasEngine.scale - wheelDelta / 1200;
  flag = true;
  if (scale >= .1 && scale <= 5) {
    canvasEngine.clear(ctx);
    ctx.drawImage(markerCache[+(wheelDelta > 0)], 0, 0);
    canvasEngine.setScale(scale + delta).clear(cacheCtx[0]).render(cacheCtx[0]);
    canvasEngine.setScale(scale - delta).clear(cacheCtx[1]).render(cacheCtx[1]);
    canvasEngine.setScale(scale);
  }
});

marker.addEventListener('mousedown', function (e) {

});

console.log(canvasEngine);