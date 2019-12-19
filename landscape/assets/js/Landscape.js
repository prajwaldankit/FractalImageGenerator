class Landscape {
  constructor(parent, ref) {
    this.parent = parent;
    this.context = this.parent.getContext('2d');
    this.reference = ref;
    this.refContext = this.reference.context;
    this.dimension = 256;
    this.land = [];
    this.colx = [];
    this.originX;
    this.originY;
    this.colors;
    this.shadow;
    this.ht;
    this.sunht;
    this.init();
    // new Stars(this.parent);
  }

  init() {
    for (let i = 0; i <= this.dimension; i++) {
      this.land.push(new Array(this.dimension + 1));
      this.colx.push(new Array(this.dimension + 1));
    }
    this.generate();
    this.getReferences();
    this.draw3d();
    // setInterval(() => {
    //   this.sunht += 0.1 + (this.sunht / 10.0);
    //   if (this.sunht > 5) {
    //     this.sunht = 0;
    // generate(); 
    //   }
    //   this.draw3d();
    //   console.log('here')
    // }, 200);
    // console.log(this.land)
    // console.log(this.colx)
  }

  getReferences() {
    this.colors = new Array(REF_CANVAS_WIDTH + 1);
    for (let cx = 0; cx <= REF_CANVAS_WIDTH; cx++) {
      this.colors[cx] = new Array(REF_CANVAS_HEIGHT + 1);
      for (let cy = 0; cy <= REF_CANVAS_HEIGHT; cy++) {
        let data = this.refContext.getImageData(cx, cy, 1, 1).data;
        this.refContext.fillStyle =
          "rgb(" + data[0] + "," + data[1] + "," + data[2] + ")";
        this.colors[cx][cy] = this.refContext.fillStyle;
      }
    }
  }

  generate() {
    this.land[0][0] = new Random().noise(100);
    this.land[this.dimension][0] = new Random().noise(100);
    this.land[0][this.dimension] = new Random().noise(100);
    this.land[this.dimension][this.dimension] = new Random().noise(100);

    for (
      let gridsize = this.dimension / 2;
      gridsize >= 1;
      gridsize = Math.floor(gridsize / 2)
    ) {
      // console.log("Generating with gridsize " + gridsize);
      this.halflon(gridsize);
      this.halflat(gridsize);
    }
    // Now pre-calculate the colours:
    for (let lat = 0; lat <= this.dimension; lat++) {
      for (let lon = 0; lon <= this.dimension; lon++) {
        // We are also adding a little more noise to col, looks fluffier.
        // colour based on height, but height min 2px (sea level):
        this.colx[lat][lon] = new Random().limit(
          0,
          Math.floor(this.land[lat][lon] * 2 + new Random().noise(0) + REF_CANVAS_WIDTH / 2),
          980
        );
        this.land[lat][lon] = new Random().limit(2, this.land[lat][lon] + new Random().noise(0), 999);
      }
    }

  }

  draw3d() {
    this.context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    // new Stars(this.parent);
    this.originX = CANVAS_WIDTH / 2;
    this.originY = CANVAS_HEIGHT - this.dimension * 2 - 100;
    this.sunht = 4;
    for (let lat = 0; lat < this.dimension; lat++) {
      // some pre-calculations, for speed:
      let ox = this.originX + lat * 2;
      let oy = this.originY + lat;
      this.shadow = this.land[lat][0];
      for (let lon = 1; lon < this.dimension; lon++) {
        this.ht = this.land[lat][lon];
        // ctx.fillStyle = '#222'
        this.context.fillStyle =
          this.colors[this.colx[lat][lon]][
          Math.floor(new Random().limit(0, this.shadow - this.ht + REF_CANVAS_HEIGHT / 2, REF_CANVAS_HEIGHT - 1))
          ];
        // Maths for the isometric landscape view:
        this.context.fillRect(ox - lon * 2, oy + lon - this.ht, 2, 10);
        // And drop the this.shadow. Raise it if we are in the light.

        this.shadow = this.shadow - this.sunht;
        if (this.shadow < this.ht) {
          this.shadow = this.ht;
        }
      }
    }
    for (let lat = 0; lat <= this.dimension; lat++) {
      // Front Left edge:
      this.context.fillStyle = 'gray';
      this.context.fillRect(
        this.originX + lat * 2 - this.dimension * 2,
        this.originY + lat + this.dimension + 10,
        2,
        -10 - this.land[lat][this.dimension]
      );
      // Front right edge:
      this.context.fillStyle = 'darkGray';
      this.context.fillRect(
        this.originX + this.dimension * 2 - lat * 2,
        this.originY + this.dimension + lat + 10,
        2,
        -10 - this.land[this.dimension][lat]
      );
    }
  }

  halflon(gridsize) {
    // Generate new points on the longitudinal axis.
    // For each new point we take the average of the grid point to
    // our E and W, and add some proportional "new Random().noise" up or down:
    for (let lat = 0; lat <= this.dimension; lat += gridsize * 2) {
      for (let lon = gridsize; lon <= this.dimension; lon += gridsize * 2) {
        this.land[lat][lon] =
          (this.land[lat][lon - gridsize] +
            this.land[lat][lon + gridsize] +
            new Random().noise(gridsize * 3)) /
          2;
      }
    }
  }

  halflat(gridsize) {
    // Generate new points on the latitudinal axis.
    // For each new point we take the average of the grid point to
    // our N and S, and add some proportional "noise" up or down:
    for (let lat = gridsize; lat <= this.dimension; lat += gridsize * 2) {
      for (let lon = 0; lon <= this.dimension; lon += gridsize) {
        this.land[lat][lon] =
          (this.land[lat - gridsize][lon] +
            this.land[lat + gridsize][lon] +
            new Random().noise(gridsize * 3)) /
          2;
      }
    }
  }
}