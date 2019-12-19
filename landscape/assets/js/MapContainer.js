class MapContainer {
  constructor(parent) {
    this.parent = parent;
    this.reference;
    this.map;
    this.initMainMap();
    this.initRefCanvas();
    this.generate();
  }
  initRefCanvas() {
    this.reference = new RefCanvas(this.parent);
    // console.log('in init', this.reference);
  }
  initMainMap() {
    this.map = new MainMap(this.parent);
  }
  generate() {
    this.reference.generate();
    this.map.generate(this.reference);
  }
}
