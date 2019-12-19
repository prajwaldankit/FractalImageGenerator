const REF_CANVAS_WIDTH = 1000;
const REF_CANVAS_HEIGHT = 80;
/**
 *
 *
 * @class RefCanvas
 */
class RefCanvas {
  /**
   *Creates an instance of RefCanvas.
   * @param {*} parent
   * @memberof RefCanvas
   */
  constructor(parent) {
    this.parent = parent;
    this.init();
    this.canvas.style.display = 'none';
  }

  /**
   *
   *
   * @memberof RefCanvas
   */
  init() {
    this.canvas = document.createElement('canvas');
    // console.log('in ref calss', this.canvas);
    this.context = this.canvas.getContext('2d');
    this.canvas.width = REF_CANVAS_WIDTH;
    this.canvas.height = REF_CANVAS_HEIGHT;
    this.parent.appendChild(this.canvas);
  }

  /**
   *
   *
   * @memberof RefCanvas
   */
  generate() {
    this.grd = this.context.createLinearGradient(0, 0, this.canvas.width, 0);
    this.grd.addColorStop(0.0, "#004"); // depths
    this.grd.addColorStop(0.45, "#04f"); // sea
    this.grd.addColorStop(0.48, "#fff"); // waves
    this.grd.addColorStop(0.5, "#dd0"); // sand
    this.grd.addColorStop(0.51, "#040"); // greens
    this.grd.addColorStop(0.6, "#2b0"); // greens
    this.grd.addColorStop(0.66, "#640"); // browns
    this.grd.addColorStop(0.72, "#bbb"); // greys
    this.grd.addColorStop(0.79, "#888"); // greys
    this.grd.addColorStop(0.8, "#fff"); // snow
    this.grd.addColorStop(0.99, "#fff"); // snow
    this.grd.addColorStop(0.99, "#876"); // edges
    this.grd.addColorStop(1.0, "#876"); // edges
    this.grd.addColorStop(1.0, "#2b0"); // edges
    this.context.fillStyle = this.grd;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.grd = this.context.createLinearGradient(0, 0, 0, this.canvas.height);
    this.grd.addColorStop(0.0, "rgba(255,255,255, 1.0)"); // lit up
    this.grd.addColorStop(0.5, "rgba(0,0,0,       0.0)"); // start of shadow
    this.grd.addColorStop(0.53, "rgba(0,0,0,       0.6)"); // start of shadow
    this.grd.addColorStop(0.85, "rgba(0,0,0,       0.8)"); // deepest shadow
    this.context.fillStyle = this.grd;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
