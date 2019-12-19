const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 800;
class MainMap {
  constructor(parent) {
    this.parent = parent;
    this.parent.style.width = CANVAS_WIDTH;
    this.parent.style.height = CANVAS_HEIGHT;
    this.init();
  }
  init() {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.canvas.height = CANVAS_HEIGHT;
    this.canvas.width = CANVAS_WIDTH;
    this.parent.appendChild(this.canvas);
  }
  generate(ref) {
    this.reference = ref;
    new Landscape(this.canvas, this.reference);
  }
}