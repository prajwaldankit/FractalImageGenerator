const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 720;
/**
 *
 * Generates the canvas inside the div for drawing the fractal images
 * @class FractalCanvas
 */
class FractalCanvas {
  /**
   *Creates an instance of FractalCanvas.
   * @param {*} parent
   * @memberof FractalCanvas
   */
  constructor(parent) {
    this.parent = parent;
    this.parent.style.width = `${CANVAS_WIDTH}px`;
    this.parent.style.height = `${CANVAS_HEIGHT}px`;
    this.init();
    new Silk(this.canvas);
    new Fractal(this.canvas);
    // new Madelbrot(this.canvas);
  }

  /**
   *
   *
   * @memberof FractalCanvas
   */
  init() {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.applyStyle();
    this.parent.appendChild(this.canvas);
  }
  /**
   *
   *apply stye to the canvas
   * @memberof FractalCanvas
   */
  applyStyle() {
    this.canvas.width = CANVAS_WIDTH;
    this.canvas.height = CANVAS_HEIGHT;
    this.canvas.style.background = '#000';
  }
  draw() {
  }
}