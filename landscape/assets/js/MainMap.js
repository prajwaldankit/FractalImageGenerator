const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 800;
/**
 *
 *
 * @class MainMap
 */
class MainMap {
  /**
   *Creates an instance of MainMap.
   * @param {*} parent
   * @param {*} size
   * @memberof MainMap
   */
  constructor(parent, size) {
    this.parent = parent;
    this.size;
    this.parent.style.width = CANVAS_WIDTH;
    this.parent.style.height = CANVAS_HEIGHT;
    this.init();
  }
  /**
   *
   *
   * @memberof MainMap
   */
  init() {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.canvas.height = CANVAS_HEIGHT;
    this.canvas.width = CANVAS_WIDTH;
    this.parent.appendChild(this.canvas);
  }
  /**
   *
   *
   * @param {*} ref
   * @param {*} size
   * @memberof MainMap
   */
  generate(ref, size) {
    this.size = size;
    this.reference = ref;
    new Landscape(this.canvas, this.reference, this.size);
  }
}