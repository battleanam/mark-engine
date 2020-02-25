// 配置常量
const scaleStep = .2;

const marker = document.getElementById('marker');
const ctx = marker.getContext('2d');
const clientEvent = new ClientEvent(marker);

// const markerCache = [
//   document.createElement('canvas'),
//   document.createElement('canvas'),
// ];
// const cacheCtx = [];
//
// markerCache.forEach((cache, index) => {
//   cache.width = marker.width;
//   cache.height = marker.height;
//   cacheCtx[index] = cache.getContext('2d');
//   // document.body.append(cache);
// });


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

let dragging = false, mousedown = false, sx = 0, sy = 0;

document.onkeydown = function (e) {
  if (e.key === " ") {
    e.preventDefault();
    if (dragging) {
      return;
    }
    dragging = true;
    marker.style.cursor = 'grab';

  }
};

document.onkeyup = function (e) {
  if (e.key === " ") {
    e.preventDefault();
    dragging = false;
    marker.style.cursor = 'default';
    if (mousedown) {
      mousedown = false;
      // canvasEngine.updateLocation();
    }
  }
};
canvasEngine.setScale(1);
canvasEngine.setBackground(background).addMark(mark).render(ctx, -1);
canvasEngine.setScale(1);


marker.addEventListener('mousewheel', function (e) {
  e.preventDefault();
  const {wheelDelta} = e;
  const scale = canvasEngine.scale - wheelDelta / 600;
  if (scale >= .1 && scale <= 10) {
    canvasEngine.setScale(scale);
    canvasEngine.clear(ctx).render(ctx, +(wheelDelta > 0));
    canvasEngine.setScale(scale);
  }
});

marker.addEventListener('mousedown', function (e) {
  if (dragging) {
    mousedown = true;
    canvasEngine.prepareDrag();
    canvasEngine.updateLocation();
    const {x, y} = clientEvent;
    marker.style.cursor = 'grabbing';
    sx = x;
    sy = y;
  }

});

let i = 0;
marker.addEventListener('mousemove', function () {
  if (dragging && mousedown) {
    const {x, y} = clientEvent;
    i = (i + 1) % 3;
    !i && canvasEngine.clear(ctx).move({offsetX: x - sx, offsetY: y - sy}).render(ctx);
  }
});

marker.addEventListener('mouseup', function () {
  if (dragging && mousedown) {
    marker.style.cursor = 'grab';
    dragging = false;
    mousedown = false;
  }
  canvasEngine.prepareZoom();
  console.log(canvasEngine);
});

