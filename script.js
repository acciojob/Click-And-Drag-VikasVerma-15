const container = document.getElementById('container');
const cubes = document.querySelectorAll('.item');

let selectedCube = null;
let offsetX = 0;
let offsetY = 0;

// Drag start
cubes.forEach(cube => {
  cube.addEventListener('mousedown', e => {
    selectedCube = cube;
    const rect = cube.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    cube.style.zIndex = 1000;
    cube.style.cursor = 'grabbing';
  });
});

// Drag move
document.addEventListener('mousemove', e => {
  if (!selectedCube) return;
  const rect = container.getBoundingClientRect();
  let x = e.clientX - rect.left - offsetX;
  let y = e.clientY - rect.top - offsetY;

  // Keep inside container
  x = Math.max(0, Math.min(container.clientWidth - selectedCube.offsetWidth, x));
  y = Math.max(0, Math.min(container.clientHeight - selectedCube.offsetHeight, y));

  selectedCube.style.left = x + 'px';
  selectedCube.style.top = y + 'px';
});

// Drop
document.addEventListener('mouseup', () => {
  if (!selectedCube) return;
  selectedCube.style.zIndex = '';
  selectedCube.style.cursor = 'pointer';
  selectedCube = null;
});
