class Silk {
  constructor(parent) {
    this.canvas = parent;
    this.initVars();
    this.initEvents();
    this.waves = [];
    this.length = 0;
  }
  initVars() {
    this.ctx = this.canvas.getContext("2d")
    this.isMouseClicked = false
    this.isMouseInCanvas = false
    this.prevX = 0
    this.currX = 0
    this.prevY = 0
    this.currY = 0
    this.wave = new Wave();
  }

  initEvents() {
    this.canvas.addEventListener("mousemove", (e) => this.onMouseMove(e))
    this.canvas.addEventListener("mousedown", (e) => this.onMouseDown(e))
    this.canvas.addEventListener("mouseup", () => this.onMouseUp())
    this.canvas.addEventListener("mouseout", () => this.onMouseOut())
    this.canvas.addEventListener("mouseenter", (e) => this.onMouseEnter(e))
    window.addEventListener('keydown', (e) => this.clearCanvas(e))
  }
  clearCanvas(e) {
    if (e.key == ' ') this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  }
  onMouseDown(e) {
    this.isMouseClicked = true
    this.updateCurrentPosition(e)
    this.ctx.beginPath()
    this.waves = [];
    for (let i = 0; i < 2; i++) {
      this.waves.push(new Wave());
    }
    this.ctx.moveTo(this.currX, this.currY)
    this.holdDraw = setInterval(() => {
      // this.ctx.moveTo(this.currX, this.currY)
      this.waves.forEach((wave) => {
        // console.log(wave)
        this.draw('down', wave);

      })
      // console.log(this.wave)
      // this.draw('down', this.wave);
      // this.ctx.closePath();
    }
      , 10)
  }

  onMouseUp() {
    this.isMouseClicked = false
    this.length = 0;
    clearInterval(this.holdDraw)
    this.ctx.closePath();
  }

  onMouseEnter(e) {
    this.isMouseInCanvas = true
    this.updateCurrentPosition(e)
  }

  onMouseOut() {
    this.isMouseInCanvas = false
  }

  onMouseMove(e) {
    if (this.isMouseClicked && this.isMouseInCanvas) {
      this.updateCurrentPosition(e)
      this.length = 0;

      this.draw('move', new Wave())
      this.ctx.closePath();
      this.ctx.beginPath();
    }
  }

  updateCurrentPosition(e) {
    this.prevX = this.currX
    this.prevY = this.currY
    this.currX = e.clientX - this.canvas.offsetLeft
    this.currY = e.clientY - this.canvas.offsetTop
  }

  draw(parent, wave) {
    const isValidDraw = wave.draw(parent, wave, this.ctx);
    if (!wave.isValidDraw()) {
      wave = new Wave();
      wave.draw(parent, wave, this.ctx)
    }
    let x, y;
    console.log('mouse down')
    console.log(wave.choice)
    console.log(wave);
    this.ctx.beginPath();
    switch (wave.choice) {
      case 1:
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
        console.log('choice 1')

        this.ctx.lineTo(x, y)
        break;

      case 2:
        console.log('choice 2')
        y = this.currY + wave.direction1 * this.length;
        x = this.currX + wave.direction2 * this.length;
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
      if (this.length < wave.length) {
        this.length++;
        this.ctx.strokeStyle = `rgba(0,0,255,${Math.random()})`;
        this.ctx.strokeStyle = this.lineColor;
        this.ctx.lineWidth = 1
        this.ctx.stroke()
        this.ctx.shadowOffsetX = 1;
        this.ctx.shadowOffsetY = 4;
        this.ctx.shadowBlur = 1;
        this.ctx.shadowColor = `hsl(240,100%,${Math.random() * (10 - 5) + 5}%)`;

      } else {
        this.ctx.closePath();
        this.ctx.beginPath();
        this.ctx.moveTo(this.currX, this.currY);
        this.wave = new Wave();
        this.length = 0;
        for (i = 0; i < this.waves.length - 1; i++) {
          this.waves[i] = new Wave();
        }

      }
    }

  }

  sine(angle) {
    return Math.sin(angle);
  }
  cosine(angle) {
    return Math.cos(angle);
  }
}