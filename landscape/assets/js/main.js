const container = document.getElementById('canvas-container');
const generate = document.getElementById('generate');
const size = document.getElementById('size');

generate.onclick = function () {
  mapDimension = parseInt(size.value, 10);
  let map = new MapContainer(container, mapDimension);
  // container.removeChild(container.childNodes[0]);
}