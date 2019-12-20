class Fractal {
  constructor(canvas) {
    this.canvas = canvas;
    this.initVars()
    this.initEvents()
  }

  initVars() {
    this.ctx = this.canvas.getContext("2d")
    this.isMouseClicked = false
    this.isMouseInCanvas = false
    this.prevX = 0
    this.currX = 0
    this.prevY = 0
    this.currY = 0
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
    this.draw('down')
  }

  onMouseUp() {
    this.isMouseClicked = false
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
      this.draw('move')
    }
  }

  updateCurrentPosition(e) {
    this.prevX = this.currX
    this.prevY = this.currY
    this.currX = e.clientX - this.canvas.offsetLeft
    this.currY = e.clientY - this.canvas.offsetTop
  }

  draw(parent) {
    if (parent == 'move') {
      this.ctx.beginPath()
      this.ctx.moveTo(this.prevX, this.prevY)
      this.ctx.lineTo(this.currX, this.currY)
      this.ctx.strokeStyle = 'blue';
      this.ctx.lineWidth = 2
      this.ctx.stroke()
      this.ctx.closePath()
    } else {
      this.ctx.beginPath()
      this.ctx.moveTo(this.currX - 1, this.currY - 1)
      this.ctx.lineTo(this.currX, this.currY)
      this.ctx.strokeStyle = 'blue';
      this.ctx.lineWidth = 2
      this.ctx.stroke()
      this.ctx.closePath()
    }
  }

  sineCurve() {

  }
}
