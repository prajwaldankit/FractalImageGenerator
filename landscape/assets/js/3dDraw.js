function draw3d() {
  start = new Date().getTime();
  // Clear the background, and draw random stars:
  ctx.clearRect(0, 0, canvas.width, canvas.height); // clear
  for (var n = 0; n < stars; n++) {
    // The stars are at fixed x/y, but twinkle in brightness
    var c = int(5 + rand(5));
    ctx.fillStyle = "#" + c + c + c;
    ctx.fillRect(starx[n], stary[n], 2, 2);
  }

  origin_x = canvas.width / 2;
  origin_y = canvas.height - width * 2 - 20;
  for (var lat = 0; lat < width; lat++) {
    // some pre-calculations, for speed:
    var ox = origin_x + lat * 2;
    var oy = origin_y + lat;
    var shadow = land[lat][0];
    for (var lon = 1; lon < width; lon++) {
      var ht = land[lat][lon];
      ctx.fillStyle =
        coltab[colx[lat][lon]][
        int(limit(0, shadow - ht + cols.height / 2, cols.height - 1))
        ];
      // Maths for the isometric landscape view:
      ctx.fillRect(ox - lon * 2, oy + lon - ht, 2, 10);
      // And drop the shadow. Raise it if we are in the light.
      shadow = shadow - sunht;
      if (shadow < ht) {
        shadow = ht;
      }
    }
  }
  // and the edges:
  for (var lat = 0; lat <= width; lat++) {
    // Front Left edge:
    ctx.fillStyle = coltab[995][cols.height - 1];
    ctx.fillRect(
      origin_x + lat * 2 - width * 2,
      origin_y + lat + width + 10,
      2,
      -10 - land[lat][width]
    );
    // Front right edge:
    ctx.fillStyle = coltab[995][cols.height * 0.6];
    ctx.fillRect(
      origin_x + width * 2 - lat * 2,
      origin_y + width + lat + 10,
      2,
      -10 - land[width][lat]
    );
  }

  totalTime += new Date().getTime() - start;

  // Done drawing. Make the sun rise a bit, and set up the next rendering:
  sunht += 0.1 + sunht / 10.0;
  if (sunht > 5) {
    sunht = 0;
    generate();
  }

  // setTimeout(draw3d, 200);
}