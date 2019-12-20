/**
 *
 *
 * @class Silk
 */
class Silk {
  /**
   *Creates an instance of Silk.
   * @param {*} parent
   * @memberof Silk
   */
  constructor(parent) {
    this.canvas = parent;
    this.initVars();
    this.initEvents();
    this.waves = [];
    this.length = 0;
  }
  /**
   *
   *
   * @memberof Silk
   */
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

  /**
   *
   *
   * @memberof Silk
   */
  initEvents() {
    this.canvas.addEventListener("mousemove", (e) => this.onMouseMove(e))
    this.canvas.addEventListener("mousedown", (e) => this.onMouseDown(e))
    this.canvas.addEventListener("mouseup", () => this.onMouseUp())
    this.canvas.addEventListener("mouseout", () => this.onMouseOut())
    this.canvas.addEventListener("mouseenter", (e) => this.onMouseEnter(e))
    window.addEventListener('keydown', (e) => this.clearCanvas(e))
  }
  /**
   *
   *
   * @param {*} e
   * @memberof Silk
   */
  clearCanvas(e) {
    if (e.key == ' ') this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  }
  /**
   *
   *
   * @param {*} e
   * @memberof Silk
   */
  onMouseDown(e) {
    this.isMouseClicked = true
    this.updateCurrentPosition(e)
    this.ctx.beginPath()
    this.holdDraw = setInterval(() => {
      // this.ctx.moveTo(this.currX, this.currY);
      this.draw('down', this.wave);
      // this.ctx.closePath();
    }
      , 10)
  }

  /**
   *
   *
   * @memberof Silk
   */
  onMouseUp() {
    this.isMouseClicked = false
    this.length = 0;
    clearInterval(this.holdDraw)
    this.ctx.closePath();
  }

  /**
   *
   *
   * @param {*} e
   * @memberof Silk
   */
  onMouseEnter(e) {
    this.isMouseInCanvas = true
    this.updateCurrentPosition(e)
  }

  /**
   *
   *
   * @memberof Silk
   */
  onMouseOut() {
    this.isMouseInCanvas = false
  }

  /**
   *
   *
   * @param {*} e
   * @memberof Silk
   */
  onMouseMove(e) {
    if (this.isMouseClicked && this.isMouseInCanvas) {
      this.updateCurrentPosition(e)
      this.length = 0;

      this.draw('move', new Wave())
      this.ctx.closePath();
      this.ctx.beginPath();
    }
  }

  /**
   *
   *
   * @param {*} e
   * @memberof Silk
   */
  updateCurrentPosition(e) {
    this.prevX = this.currX
    this.prevY = this.currY
    this.currX = e.clientX - this.canvas.offsetLeft
    this.currY = e.clientY - this.canvas.offsetTop
  }

  /**
   *
   *
   * @param {*} parent
   * @param {*} wave
   * @memberof Silk
   */
  draw(parent, wave) {
    let x, y;
    this.ctx.beginPath();
    switch (wave.choice) {
      case 1:
        x = this.currX + wave.direction1 * this.length;
        y = this.currY + wave.direction2 * this.length;
        y += wave.amplitude * this.sine(x * 0.10 + wave.amplitude * 0.10);
        if (this.checkSin) {
          y += wave.amplitude * this.sine(x * 0.10 + wave.amplitude * 0.10);
        } else {
          y += wave.amplitude * this.cosine(x * 0.10 + wave.amplitude * 0.10);
        }

        console.log(x, y);
        this.ctx.fillStyle = '#00f';
        this.ctx.fillRect(x, y, 2, 2)
        break;

      case 2:
        y = this.currY + wave.direction1 * this.length;
        x = this.currX + wave.direction2 * this.length;
        x += wave.amplitude * this.sine(y * 0.10 + wave.amplitude);
        if (this.checkSin) {
          x += wave.amplitude * this.sine(y * 0.10 + wave.amplitude);
        } else {
          x += wave.amplitude * this.cosine(y * 0.10 + wave.amplitude);
        }
        console.log(x, y);
        this.ctx.fillStyle = '#00f';
        this.ctx.fillRect(x, y, 2, 2);
        break;
    }

    if (parent == 'down') {
      if (this.length < wave.length) {
        this.length++;
        this.ctx.shadowOffsetX = Math.random() * 7;
        this.ctx.shadowOffsetY = Math.random() * 8;
        this.ctx.shadowBlur = Math.random() * 10;
        this.ctx.shadowColor = `blue`;

      } else {
        this.ctx.closePath();
        this.ctx.beginPath();
        this.ctx.moveTo(this.currX, this.currY);
        this.wave = new Wave();
        this.length = 0;
      }
    }

  }

  /**
   *
   *
   * @param {*} angle
   * @returns
   * @memberof Silk
   */
  sine(angle) {
    return Math.sin(angle);
  }
  /**
   *
   *
   * @param {*} angle
   * @returns
   * @memberof Silk
   */
  cosine(angle) {
    return Math.cos(angle);
  }
}