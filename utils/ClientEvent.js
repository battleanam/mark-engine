class ClientEvent {

  constructor(element) {
    this.x = 0;
    this.y = 0;
    this.element = element;
    element.addEventListener('mousemove', this.onMouseMove.bind(this));
  }

  onMouseMove({offsetX, offsetY}) {
    this.x = offsetX;
    this.y = offsetY;
  }

  destroy() {
    if(this.element) {
      this.element.removeEventListener('mousemove', this.onMouseMove)
    }
  }
}