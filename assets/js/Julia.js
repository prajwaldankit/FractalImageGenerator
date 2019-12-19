/* ====== STEP 1 ====== */
function step1(phase, amplitude) {
  stroke(255, 255, 255);

  const frequence = 0.01;
  beginShape();
  for (var i = 0; i < (width + 4); i += 4) {
    let y = height * 0.5;
    y += sin(i * frequence - phase) * amplitude;
    vertex(i, y);
  }
  endShape();
}

/* ====== STEP 2 ====== */
function step2(phase, amplitude) {
  stroke(255, 255, 255);

  let frequence = 0.01;

  beginShape();
  for (var i = 0; i < (width + 4); i += 4) {
    let y = height * 0.5;
    y += sin(i * frequence - phase) * amplitude;
    vertex(i, y);
  }
  endShape();

  frequence = 0.02;
  beginShape();
  for (var i = 0; i < (width + 4); i += 4) {
    let y = height * 0.5;
    y += sin(i * frequence - phase) * amplitude;
    vertex(i, y);
  }
  endShape();
}

/* ====== STEP 3 ====== */
function step3(phase, amplitude) {
  stroke(255, 255, 255);

  beginShape();
  for (var i = 0; i < (width + 4); i += 4) {
    let y = height * 0.5;
    y += sin(i * 0.01 - phase) * amplitude;
    y += sin(i * 0.02 - phase) * amplitude;
    vertex(i, y);
  }
  endShape();
}

/* ====== STEP 4 ====== */
function step4(phase, amplitude) {
  stroke(255, 255, 255);

  beginShape();
  for (var i = 0; i < (width + 4); i += 4) {
    let y = height * 0.5;
    y += sin(i * 0.01 - phase) * amplitude;
    y += sin(i * 0.02 - phase) * amplitude;
    y += sin(i * 0.04 - phase) * amplitude;
    vertex(i, y);
  }
  endShape();
}

/* ====== STEP 5 ====== */
function step5(phase, amplitude) {
  stroke(255, 255, 255);
  const linesAmount = 20;

  for (var k = 0; k < linesAmount; k++) {
    const offset = (1 - k / linesAmount) * 4;
    beginShape();
    for (var i = 0; i < (width + 4); i += 4) {
      let y = height * 0.5;
      y += sin(i * 0.01 - phase + offset) * amplitude;
      y += sin(i * 0.02 - phase + offset) * amplitude;
      y += sin(i * 0.04 - phase + offset) * amplitude;
      vertex(i, y);
    }
    endShape();
  }
}

/* ====== STEP 6 ====== */
function step6(phase, amplitude) {
  const linesAmount = 20;

  for (var k = 0; k < linesAmount; k++) {
    stroke(255, 255, 255, (k / (linesAmount - 1) * 255));
    const offset = (1 - k / linesAmount) * 4;
    beginShape();
    for (var i = 0; i < (width + 4); i += 4) {
      let y = height * 0.5;
      y += sin(i * 0.01 - phase + offset) * amplitude;
      y += sin(i * 0.02 - phase + offset) * amplitude;
      y += sin(i * 0.04 - phase + offset) * amplitude;
      vertex(i, y);
    }
    endShape();
  }
}

/* ====== STEP 7 ====== */
function step7(phase, amplitude) {
  const linesAmount = 20;

  for (var k = 0; k < linesAmount; k++) {
    stroke(255, 255, 255, (k / (linesAmount - 1) * 255));
    const offset = (1 - k / linesAmount) * 4;
    beginShape();
    for (var i = 0; i < (width + 4); i += 4) {
      let y = height * 0.5;
      y += sin(i * 0.01 - phase + offset) * amplitude;
      y += sin(i * 0.02 - phase + offset) * amplitude;
      const lastSineNoise = noise(phase * 0.1 + (i / width) * 5) * 10;
      y += sin(i * 0.04 - phase + offset + lastSineNoise) * amplitude;
      vertex(i, y);
    }
    endShape();
  }
}

/* ====== STEP 8 ====== */
function step8(phase, amplitude) {
  const linesAmount = max(1, (mouseY / windowWidth) * 40);

  for (var k = 0; k < linesAmount; k++) {
    stroke(255, 255, 255, (k / (linesAmount - 1) * 255));
    const offset = (1 - k / linesAmount) * 4;
    beginShape();

    const detail = max(4, mouseX / windowWidth * 60);
    for (var i = 0; i < (width + detail); i += detail) {
      let y = height * 0.5;
      y += sin(i * 0.01 - phase + offset) * amplitude;
      y += sin(i * 0.02 - phase + offset) * amplitude;
      const lastSineNoise = noise(phase * 0.1 + (i / width) * 5) * 10;
      y += sin(i * 0.04 - phase + offset + lastSineNoise) * amplitude;
      vertex(i, y);
    }
    endShape();
  }
}

function setup() {
  let size = min(windowWidth, windowHeight) * 0.96;
  size = floor(size);
  createCanvas(windowWidth, windowHeight);
  noiseSeed(random(100));
  mouseY = height / 2;
  noFill();
}
function windowResized() {
  let size = min(windowWidth, windowHeight) * 0.96;
  size = floor(size);
  resizeCanvas(windowWidth, windowHeight);
  noiseSeed(random(100));
  draw();
}

const texts = document.querySelectorAll('section p');
function draw() {
  clear();
  const phase = millis() * 0.001;
  const amplitude = height * 0.1;

  window['step' + step.value](phase, amplitude);

  texts.forEach(text => text.style.display = 'none');
  texts[step.value - 1].style.display = 'block';
}