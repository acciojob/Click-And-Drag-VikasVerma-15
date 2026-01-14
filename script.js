const container = document.querySelector('.items');
const cubes = document.querySelectorAll('.item');

let selectedCube = null;
let offsetX = 0;
let offsetY = 0;

// Initialize cubes to absolute positions
cubes.forEach(cube => {
  const rect = cube.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  cube.style.position = 'absolute';
  cube.style.left = rect.left - containerRect.left + 'px';
  cube.style.top = rect.top - containerRect.top + 'px';
  cube.style.margin = '0'; // remove any margin
  cube.style.transform = 'none'; // disable CSS transforms

  cube.addEventListener('mousedown', (e) => {
    selectedCube = cube;
    offsetX = e.clientX - cube.getBoundingClientRect().left;
    offsetY = e.clientY - cube.getBoundingClientRect().top;

    cube.style.zIndex = 1000;
    cube.style.cursor = 'grabbing';
  });
});

// Dragging
document.addEventListener('mousemove', (e) => {
  if (!selectedCube) return;

  const containerRect = container.getBoundingClientRect();
  let x = e.clientX - containerRect.left - offsetX;
  let y = e.clientY - containerRect.top - offsetY;

  // Keep cube inside container
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
