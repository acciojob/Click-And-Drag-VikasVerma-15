const container = document.getElementById('container');
const cubes = document.querySelectorAll('.cube');

let selectedCube = null;
let offsetX = 0;
let offsetY = 0;

// Initialize cubes in a grid (4x4)
const cols = 4;
const gap = 10;
cubes.forEach((cube, index) => {
  const row = Math.floor(index / cols);
  const col = index % cols;
  cube.style.left = col * (100 + gap) + "px";
  cube.style.top = row * (100 + gap) + "px";
});

// Start dragging
cubes.forEach(cube => {
  cube.addEventListener("mousedown", e => {
    selectedCube = cube;
    const rect = cube.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    cube.style.zIndex = 1000;
    cube.style.cursor = "grabbing";
  });
});

// Move dragging
document.addEventListener("mousemove", e => {
  if (!selectedCube) return;
  const containerRect = container.getBoundingClientRect();
  let x = e.clientX - containerRect.left - offsetX;
  let y = e.clientY - containerRect.top - offsetY;

  // Keep cube inside container
  x = Math.max(0, Math.min(container.clientWidth - selectedCube.offsetWidth, x));
  y = Math.max(0, Math.min(container.clientHeight - selectedCube.offsetHeight, y));

  selectedCube.style.left = x + "px";
  selectedCube.style.top = y + "px";
});

// Drop cube
document.addEventListener("mouseup", () => {
  if (!selectedCube) return;
  selectedCube.style.zIndex = "";
  selectedCube.style.cursor = "pointer";
  selectedCube = null;
});
