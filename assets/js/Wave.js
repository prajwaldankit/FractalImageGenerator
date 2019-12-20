class Wave {
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
  isValidDraw() {
    if (this.drawnLength < this.length) {
      return true;
    } else {
      return false;
    }
  }

  randomBool() {
    return Math.random() >= 0.5;
  }
  randomDirection() {
    return Math.random() <= 0.33 ? -1 : Math.random() >= 0.66 ? 1 : 0;
  }
  sine(angle) {
    return Math.sin(angle);
  }
  cosine(angle) {
    return Math.cos(angle);
  }
}