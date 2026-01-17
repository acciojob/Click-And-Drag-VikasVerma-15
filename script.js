const container = document.getElementById("container");
const cubes = document.querySelectorAll(".cube");

let selectedCube = null;
let offsetX = 0;
let offsetY = 0;
let isDragging = false;

/* Arrange cubes in grid */
const cols = 4;
const gap = 10;

cubes.forEach((cube, index) => {
  const row = Math.floor(index / cols);
  const col = index % cols;

  cube.style.left = col * (100 + gap) + "px";
  cube.style.top = row * (100 + gap) + "px";
});

/* Mouse Down */
cubes.forEach((cube) => {
  cube.addEventListener("mousedown", (e) => {
    selectedCube = cube;
    isDragging = true;

    const rect = cube.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    cube.style.zIndex = "1000";
  });
});

/* Mouse Move — IMPORTANT: attached to container */
container.addEventListener("mousemove", (e) => {
  if (!isDragging || !selectedCube) return;

  const containerRect = container.getBoundingClientRect();

  let x = e.clientX - containerRect.left - offsetX;
  let y = e.clientY - containerRect.top - offsetY;

  /* Keep inside container */
  x = Math.max(0, Math.min(container.clientWidth - selectedCube.offsetWidth, x));
  y = Math.max(0, Math.min(container.clientHeight - selectedCube.offsetHeight, y));

  selectedCube.style.left = x + "px";
  selectedCube.style.top = y + "px";
});

/* Mouse Up */
document.addEventListener("mouseup", () => {
  if (!isDragging) return;

  selectedCube.style.zIndex = "";
  selectedCube = null;
  isDragging = false;
});

