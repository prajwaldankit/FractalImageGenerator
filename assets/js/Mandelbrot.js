class Madelbrot {

  constructor(parent) {
    this.magnificationFactor = 200;
    this.panX = .5;
    this.panY = .6;
    this.canvas = parent;
    let that = this;
    this.context = this.canvas.getContext('2d');
    this.init();
    window.addEventListener('keypress', () => {
      that.magnificationFactor += 400;
      console.log(that.magnificationFactor)
      that.context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      this.init(this.noOfIterations + 10)
    })
  }

  init(noOfIterations) {
    this.noOfIterations = noOfIterations || 50;
    for (let x = 0; x < this.canvas.width; x++) {
      for (let y = 0; y < this.canvas.height; y++) {
        let belongsToSet =
          this.checkIfBelongsToMandelbrotSet(x / this.magnificationFactor - this.panX,
            y / this.magnificationFactor - this.panY);
        if (belongsToSet != 0) {
          this.context.fillStyle = `hsl(240,100%,${belongsToSet}%)`;
          this.context.fillRect(x, y, 1, 1); // Draw a black pixel
        }
      }
    }
  }

  checkIfBelongsToMandelbrotSet(x, y) {
    let realComponent = x;
    let imaginaryComponent = y;
    let maxIterations = this.noOfIterations;
    for (var i = 0; i < maxIterations; i++) {
      // Calculate the real and imaginary components of the result
      // separately
      let tempRealComponent = realComponent * realComponent
        - imaginaryComponent * imaginaryComponent
        + x;

      let tempImaginaryComponent = 2 * realComponent * imaginaryComponent
        + y;

      realComponent = tempRealComponent;
      imaginaryComponent = tempImaginaryComponent;
      if (realComponent * imaginaryComponent > 5)
        return (i / maxIterations * 100); // In the Mandelbrot set
    }
    return 0;
  }

}