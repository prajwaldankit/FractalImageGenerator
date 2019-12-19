class Random {
  constructor() {

  }
  limit(min, x, max) {
    return x < min ? min : x > max ? max : x;
  }

  rand(max) {
    return Math.random() * max;
  }

  noise(max) {
    return this.rand(max) - this.rand(max);
  }
}