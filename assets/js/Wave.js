/**
 *
 *
 * @class Wave
 */
class Wave {
  /**
   *Creates an instance of Wave.
   * @memberof Wave
   */
  constructor() {
    this.amplitude = Math.random() * (10 - 2) + 2;
    this.checkSin = this.randomBool();
    this.choice = Math.round(Math.random() * (2 - 1)) + 1;
    this.direction1 = this.randomDirection();
    this.direction2 = this.randomDirection();
    // this.length = Math.ceil(Math.random() * 500);
    this.drawnLength = 0;
    this.length = Math.random() * 40;
  }
  /**
   *
   *
   * @returns
   * @memberof Wave
   */
  isValidDraw() {
    if (this.drawnLength < this.length) {
      return true;
    } else {
      return false;
    }
  }

  /**
   *
   *
   * @returns
   * @memberof Wave
   */
  randomBool() {
    return Math.random() >= 0.5;
  }
  /**
   *
   *
   * @returns
   * @memberof Wave
   */
  randomDirection() {
    return Math.random() <= 0.33 ? -1 : Math.random() >= 0.66 ? 1 : 0;
  }
  /**
   *
   *
   * @param {*} angle
   * @returns
   * @memberof Wave
   */
  sine(angle) {
    return Math.sin(angle);
  }
  /**
   *
   *
   * @param {*} angle
   * @returns
   * @memberof Wave
   */
  cosine(angle) {
    return Math.cos(angle);
  }
}