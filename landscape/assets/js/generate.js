function generate(parent) {
  // First of all, how long did all the previous sunlight rednderings
  // take, in total?
  if (totalTime) {
    console.log("Total " + totalTime + "ms");
  }
  totalTime = 0;

  // Corners start at height -100..+100
  land[0][0] = noise(100);
  land[width][0] = noise(100);
  land[0][width] = noise(100);
  land[width][width] = noise(100);

  // Basically we take a 256x256 grid, half it to 128x256, again to 128x128.
  // Then we repeat to 64x64, 32x32, 16x16, 8x8, 4x4, 2x2, 1x1:
  for (
    var gridsize = width / 2;
    gridsize >= 1;
    gridsize = int(gridsize / 2)
  ) {
    // console.log("Generating with gridsize " + gridsize);
    halflon(gridsize);
    halflat(gridsize);
  }
  // Now pre-calculate the colours:
  for (var lat = 0; lat <= width; lat++) {
    for (var lon = 0; lon <= width; lon++) {
      // We are also adding a little more noise to col, looks fluffier.
      // colour based on height, but height min 2px (sea level):
      colx[lat][lon] = limit(
        0,
        int(land[lat][lon] * 2 + noise(0) + cols.width / 2),
        980
      );
      land[lat][lon] = limit(2, land[lat][lon] + noise(0), 999);
    }
  }

  // And generate random star coords:
  for (var n = 0; n < stars; n++) {
    starx[n] = rand(canvas.width);
    stary[n] = rand(canvas.height);
  }
}
class Generate {
  constructor() {

  }
  init() {

  }

}