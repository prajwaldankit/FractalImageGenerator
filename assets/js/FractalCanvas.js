const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 480;
class FractalCanvas {
  constructor(parent) {
    this.parent = parent;
    this.init();
    // new Fractal(this.canvas);
    new Madelbrot(this.canvas);
  }

  init() {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.applyStyle();
    this.parent.appendChild(this.canvas);
  }
  applyStyle() {
    this.canvas.width = CANVAS_WIDTH;
    this.canvas.height = CANVAS_HEIGHT;
    this.canvas.style.background = '#262626';
  }
  draw() {
  }
}