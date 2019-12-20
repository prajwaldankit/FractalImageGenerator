/**
 *
 *
 * @class MapContainer
 */
class MapContainer {
  constructor(parent, size) {
    this.parent = parent;
    this.size = size || 256;
    this.reference;
    this.map;
    this.initMainMap();
    this.initRefCanvas();
    this.generate();
  }
  /**
   *
   *
   * @memberof MapContainer
   */
  initRefCanvas() {
    this.reference = new RefCanvas(this.parent);
    // console.log('in init', this.reference);
  }
  /**
   *
   *
   * @memberof MapContainer
   */
  initMainMap() {
    this.map = new MainMap(this.parent);
  }
  /**
   *
   *
   * @memberof MapContainer
   */
  generate() {
    this.reference.generate();
    this.map.generate(this.reference, this.size);
  }
}
