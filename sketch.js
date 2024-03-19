let angleY = 0;
let angleX = 0;
let earthTexture;
let zoomLevel = 600;
const minZoom = 200;
const maxZoom = 1000;
let dragging = false;
let rY = 0;
let rX = 0;
let prevX = 0;
let prevY = 0;

function preload() {
  earthTexture = loadImage('earth.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  const zoomInButton = document.getElementById('zoom-in');
  const zoomOutButton = document.getElementById('zoom-out');
  const zoomLevelBar = document.getElementById('zoom-level-bar');
  
  zoomInButton.addEventListener('click', () => {
    zoomLevel = max(minZoom, zoomLevel - 50);
    updateZoomBar();
  });
  
  zoomOutButton.addEventListener('click', () => {
    zoomLevel = min(maxZoom, zoomLevel + 50);
    updateZoomBar();
  });
  
  function updateZoomBar() {
    let zoomFraction = (zoomLevel - minZoom) / (maxZoom - minZoom);
    zoomLevelBar.style.width = `${zoomFraction * 100}%`;
  }

  updateZoomBar();

  canvas.addEventListener('mousedown', function(e) {
    dragging = true;
    prevX = e.clientX;
    prevY = e.clientY;
  });

  canvas.addEventListener('mousemove', function(e) {
    if (dragging) {
      let currX = e.clientX;
      let currY = e.clientY;
      
      rY += (currX - prevX) * 0.005;
      rX += (currY - prevY) * 0.005;

      prevX = currX;
      prevY = currY;
    }
  });

  document.addEventListener('mouseup', function() {
    dragging = false;
  });
}

function draw() {
  background(0);

  directionalLight(255, 255, 255, 0, 0, -1);
  ambientLight(100);

  let camX = map(mouseX, 0, width, -200, 200);
  let camY = map(mouseY, 0, height, -200, 200);
  camera(camX, camY, zoomLevel, 0, 0, 0, 0, 1, 0);

  if (!dragging) {
    rY += 0.001;
  }

  push();
  rotateX(rX);
  rotateY(rY);
  noStroke();
  texture(earthTexture);
  sphere(150);
  pop();
}
