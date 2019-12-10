const container = document.getElementsByClassName('fractal-container');
for (i = 0; i < container.length; i++) {
  new FractalCanvas(container[i]);
}
