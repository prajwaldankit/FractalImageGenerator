const container = document.getElementsByClassName('canvas-container');

for (i = 0; i < container.length; i++) {
  new MapContainer(container[i]);
}