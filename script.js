// Your code here.
const container = document.querySelector('.items');
const cubes = document.querySelectorAll('.item');

let selectedCube = null;
let offsetX = 0;
let offsetY = 0;

// Get container boundaries
const containerRect = container.getBoundingClientRect();

cubes.forEach(cube => {
  cube.style.position = 'absolute'; // Make each cube absolutely positioned
  const cubeRect = cube.getBoundingClientRect();
  cube.style.left = cubeRect.left - containerRect.left + 'px';
  cube.style.top = cubeRect.top - containerRect.top + 'px';

  cube.addEventListener('mousedown', (e) => {
    selectedCube = cube;
    const rect = cube.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    // Bring cube to front
    cube.style.zIndex = 1000;

    // Optional: add visual cue
    cube.style.boxShadow = '0 0 20px rgba(0,0,0,0.5)';
  });
});

// Handle mouse move
document.addEventListener('mousemove', (e) => {
  if (!selectedCube) return;

  let x = e.clientX - containerRect.left - offsetX;
  let y = e.clientY - containerRect.top - offsetY;

  // Boundary constraints
  x = Math.max(0, Math.min(container.clientWidth - selectedCube.offsetWidth, x));
  y = Math.max(0, Math.min(container.clientHeight - selectedCube.offsetHeight, y));

  selectedCube.style.left = x + 'px';
  selectedCube.style.top = y + 'px';
});

// Handle mouse up
document.addEventListener('mouseup', () => {
  if (selectedCube) {
    selectedCube.style.zIndex = '';
    selectedCube.style.boxShadow = '';
    selectedCube = null;
  }
});
