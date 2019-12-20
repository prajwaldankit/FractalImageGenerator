/**
 *
 *
 * @class Landscape
 */
class Landscape {
  /**
   *Creates an instance of Landscape.
   * @param {*} parent
   * @param {*} ref
   * @param {*} size
   * @memberof Landscape
   */
  constructor(parent, ref, size) {
    this.parent = parent;
    this.context = this.parent.getContext('2d');
    this.reference = ref;
    this.refContext = this.reference.context;
    this.dimension = size;
    this.land = [];
    this.colx = [];
    this.originX;
    this.originY;
    this.colors;
    this.shadow;
    this.ht;
    this.sunht;
    this.stars = new Stars(this.parent);
    this.init();
  }

  /**
   *
   *
   * @memberof Landscape
   */
  init() {
    this.stars.generate();
    for (let i = 0; i <= this.dimension; i++) {
      this.land.push(new Array(this.dimension + 1));
      this.colx.push(new Array(this.dimension + 1));
    }
    this.generate();
    this.getReferences();
    this.draw3d();
    setInterval(() => {
      console.log(this.sunht);
      this.sunht += 0.1 + (this.sunht / 10.0);
      console.log(this.sunht);
      if (this.sunht > 5) {
        this.sunht = 0;
      }
      this.draw3d();
    }, 200);
  }

  /**
   *
   *
   * @memberof Landscape
   */
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

  /**
   *
   *
   * @memberof Landscape
   */
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
      this.halflon(gridsize);
      this.halflat(gridsize);
    }
    for (let lat = 0; lat <= this.dimension; lat++) {
      for (let lon = 0; lon <= this.dimension; lon++) {
        this.colx[lat][lon] = new Random().limit(
          0,
          Math.floor(this.land[lat][lon] * 2 + new Random().noise(0) + REF_CANVAS_WIDTH / 2),
          980
        );
        this.land[lat][lon] = new Random().limit(2, this.land[lat][lon] + new Random().noise(0), 999);
      }
    }

  }

  /**
   *
   *
   * @memberof Landscape
   */
  draw3d() {
    this.context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    this.stars.drawStars();
    this.originX = CANVAS_WIDTH / 2;
    this.originY = CANVAS_HEIGHT / 2 - this.dimension * 2 + 300;
    this.sunht = this.sunht || 0;
    for (let lat = 0; lat < this.dimension; lat++) {

      let ox = this.originX + lat * 2;
      let oy = this.originY + lat;
      this.shadow = this.land[lat][0];
      for (let lon = 1; lon < this.dimension; lon++) {
        this.ht = this.land[lat][lon];
        this.context.fillStyle =
          this.colors[this.colx[lat][lon]][
          Math.floor(new Random().limit(0, this.shadow - this.ht + REF_CANVAS_HEIGHT / 2, REF_CANVAS_HEIGHT - 1))
          ];
        this.context.fillRect(ox - lon * 2, oy + lon - this.ht, 2, 10);

        this.shadow = this.shadow - this.sunht;
        if (this.shadow < this.ht) {
          this.shadow = this.ht;
        }
      }
    }
    for (let lat = 0; lat <= this.dimension; lat++) {
      this.context.fillStyle = 'gray';
      this.context.fillRect(
        this.originX + lat * 2 - this.dimension * 2,
        this.originY + lat + this.dimension + 10,
        2,
        -10 - this.land[lat][this.dimension]
      );
      this.context.fillStyle = 'darkGray';
      this.context.fillRect(
        this.originX + this.dimension * 2 - lat * 2,
        this.originY + this.dimension + lat + 10,
        2,
        -10 - this.land[this.dimension][lat]
      );
    }
  }

  /**
   *
   *
   * @param {*} gridsize
   * @memberof Landscape
   */
  halflon(gridsize) {
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

  /**
   *
   *
   * @param {*} gridsize
   * @memberof Landscape
   */
  halflat(gridsize) {
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