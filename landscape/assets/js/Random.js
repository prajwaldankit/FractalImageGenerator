/**
 *
 *
 * @class Random
 */
class Random {
  /**
   *Creates an instance of Random.
   * @memberof Random
   */
  constructor() {

  }
  /**
   *
   *
   * @param {*} min
   * @param {*} x
   * @param {*} max
   * @returns
   * @memberof Random
   */
  limit(min, x, max) {
    return x < min ? min : x > max ? max : x;
  }

  /**
   *
   *
   * @param {*} max
   * @returns
   * @memberof Random
   */
  rand(max) {
    return Math.random() * max;
  }

  /**
   *s
   *
   * @param {*} max
   * @returns
   * @memberof Random
   */
  noise(max) {
    return this.rand(max) - this.rand(max);
  }
}