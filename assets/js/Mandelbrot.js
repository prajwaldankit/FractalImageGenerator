class Madelbrot {
  constructor(parent) {
    this.magnificationFactor = 900;
    this.panX = 0;
    this.panY = 0;
    this.canvas = parent;
    this.context = this.canvas.getContext('2d');
    this.init();
  }
  init() {
    for (let x = 0; x < this.canvas.width; x++) {
      for (let y = 0; y < this.canvas.height; y++) {
        let belongsToSet =
          this.checkIfBelongsToMandelbrotSet(x / this.magnificationFactor - this.panX,
            y / this.magnificationFactor - this.panY);
        if (belongsToSet) {
          this.context.fillRect(x, y, 1, 1); // Draw a black pixel
        }
      }
    }
  }
  checkIfBelongsToMandelbrotSet(x, y) {
    let realComponentOfResult = x;
    let imaginaryComponentOfResult = y;

    for (var i = 0; i < 10; i++) {
      // Calculate the real and imaginary components of the result
      // separately
      let tempRealComponent = realComponentOfResult * realComponentOfResult
        - imaginaryComponentOfResult * imaginaryComponentOfResult
        + x;

      let tempImaginaryComponent = 2 * realComponentOfResult * imaginaryComponentOfResult
        + y;

      realComponentOfResult = tempRealComponent;
      imaginaryComponentOfResult = tempImaginaryComponent;
    }

    if (realComponentOfResult * imaginaryComponentOfResult < 5)
      return true; // In the Mandelbrot set

    return false;
  }
}