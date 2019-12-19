class Wave {
  constructor() {
    this.amplitude = Math.random() * (10 - 2) + 2;
    this.checkSin = this.randomBool();
    this.choice = Math.round(Math.random() * (2 - 1)) + 1;
    this.direction1 = this.randomDirection();
    this.direction2 = this.randomDirection();
    // this.length = Math.ceil(Math.random() * 500);
    this.drawnLength = 0;
    this.length = 100;
  }
  isValidDraw() {
    if (this.drawnLength < this.length) {
      return true;
    } else {
      return false;
    }
  }
  draw(condition, wave, context) {
    let x, y;
    let parent = condition;
    this.ctx = context;
    switch (wave.choice) {
      case 1:
        console.log('choice 1')
        x = this.currX + wave.direction1 * this.length;
        y = this.currY + wave.direction2 * this.length;
        console.log('1', wave.direction1)
        console.log('2', wave.direction1)
        y += wave.amplitude * this.sine(x * 0.10 + wave.amplitude * 0.10);
        if (this.checkSin) {
          y += wave.amplitude * this.sine(x * 0.10 + wave.amplitude * 0.10);
        } else {
          y += wave.amplitude * this.cosine(x * 0.10 + wave.amplitude * 0.10);
        }

        this.ctx.lineTo(x, y)
        break;

      case 2:
        console.log('choice 2')
        y = this.currY + wave.direction1 * this.length;
        x = this.currX + wave.direction2 * this.length;
        console.log('1', wave.direction1)
        console.log('2', wave.direction1)
        x += wave.amplitude * this.sine(y * 0.10 + wave.amplitude);
        if (this.checkSin) {
          x += wave.amplitude * this.sine(y * 0.10 + wave.amplitude);
        } else {
          x += wave.amplitude * this.cosine(y * 0.10 + wave.amplitude);
        }

        this.ctx.lineTo(x, y)
        break;
    }

    if (parent == 'down') {
      this.lineColor = `hsl(240,100%,${Math.random() * (40 - 20) + 20}%)`;
      if (this.drawnLength < wave.length) {
        this.drawnLength++;
        // this.ctx.strokeStyle = `rgba(0,0,255,${Math.random()})`;
        this.ctx.strokeStyle = this.lineColor;
        this.ctx.lineWidth = 1
        this.ctx.stroke();
        // this.ctx.shadowOffsetX = 1;
        // this.ctx.shadowOffsetY = 4;
        // this.ctx.shadowBlur = 1;
        // this.ctx.shadowColor = `hsl(240,100%,${Math.random() * (10 - 5) + 5}%)`;

      } else {
        this.ctx.closePath();
        this.ctx.beginPath();
        this.ctx.moveTo(this.currX, this.currY);
        // this.wave = new Wave();
        this.drawnLength = 0;

      }
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