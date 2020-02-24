const marker = document.getElementById('marker');
const ctx = marker.getContext('2d');
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

marker.addEventListener('mousewheel', function ({wheelDelta}) {
  console.log(wheelDelta);
  background.scale = wheelDelta / 120;
});

console.log(canvasEngine);