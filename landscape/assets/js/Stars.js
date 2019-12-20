const NUM_OF_STARS = 100;
/**
 *
 *
 * @class Stars
 */
class Stars {
  /**
   *Creates an instance of Stars.
   * @param {*} parent
   * @memberof Stars
   */
  constructor(parent) {
    this.parent = parent;
    this.context = this.parent.getContext('2d');
    this.starX = new Array(NUM_OF_STARS);
    this.starY = new Array(NUM_OF_STARS);
    this.init();
  }
  /**
   *
   *
   * @memberof Stars
   */
  init() {
    // this.generate();
    // this.drawStars();
  }
  /**
   *
   *
   * @memberof Stars
   */
  generate() {
    for (var n = 0; n < NUM_OF_STARS; n++) {
      this.starX[n] = new Random().rand(CANVAS_WIDTH);
      this.starY[n] = new Random().rand(CANVAS_HEIGHT);
    }
  }
  /**
   *
   *
   * @memberof Stars
   */
  drawStars() {
    for (var n = 0; n < NUM_OF_STARS; n++) {

      let c = Math.floor(5 + new Random().rand(5));
      this.context.fillStyle = "#" + c + c + c;
      this.context.fillRect(this.starX[n], this.starY[n], 2, 2)
    }
  }
}