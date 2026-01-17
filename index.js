// // This file is not to be modified. Please ignore this.
// // We will understand all of this later in the course.
// // DO NOT MODIFY THIS FILE

// const express = require('express');
// const path = require('path');

// const app = express();

// app.use(express.static(__dirname))

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname + '/main.html'));
// });
// //your code here
// app.post('/add', (req, res) => {
//   const {a,b} = req.body;
//   res.status(200).send(a+b);
//   // res.sendFile(path.join(__dirname + '/main.html'));
// });
// module.exports = app;
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
cubes.forEach(cube => {
  cube.addEventListener("mousedown", e => {
    selectedCube = cube;
    isDragging = true;

    const rect = cube.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
  });
});

/* Mouse Move — MUST be container */
container.addEventListener("mousemove", e => {
  if (!isDragging || !selectedCube) return;

  const rect = container.getBoundingClientRect();

  let x = e.clientX - rect.left - offsetX;
  let y = e.clientY - rect.top - offsetY;

  x = Math.max(0, Math.min(container.clientWidth - selectedCube.offsetWidth, x));
  y = Math.max(0, Math.min(container.clientHeight - selectedCube.offsetHeight, y));

  selectedCube.style.left = x + "px";
  selectedCube.style.top = y + "px";
});

/* Mouse Up */
document.addEventListener("mouseup", () => {
  selectedCube = null;
  isDragging = false;
});
