const grid = document.getElementById('grid');
const selectColor = document.getElementById('selectColor');
const colorButton = document.getElementById('colorButton');
const rainbowButton = document.getElementById('rainbowButton');
const eraserButton = document.getElementById('eraserButton');
const clearButton = document.getElementById('clearButton');
const sizeSlider = document.getElementById('sizeSlider');
const sizeValue = document.getElementById('sizeValue');

let currentTool = 'color';
let currentColor = selectColor.value;
let isDrawing = false;
let gridSize = 12;

selectColor.addEventListener('input', (e) => {
  currentColor = e.target.value;
});

colorButton.addEventListener('click', () => setTool('color'));
rainbowButton.addEventListener('click', () => setTool('rainbow'));
eraserButton.addEventListener('click', () => setTool('eraser'));
clearButton.addEventListener('click', clearGrid);

sizeSlider.addEventListener('input', (e) => {
  gridSize = e.target.value;
  sizeValue.textContent = `${gridSize} x ${gridSize}`;
  buildGrid(gridSize);
});

document.body.addEventListener('mousedown', (e) => {
  if (e.button === 0) isDrawing = true;
});

document.body.addEventListener('mouseup', () => {
  isDrawing = false;
});

function setTool(tool) {
  currentTool = tool;
  document.querySelectorAll('.settings button').forEach(btn => btn.classList.remove('active'));
  if (tool === 'color') colorButton.classList.add('active');
  if (tool === 'rainbow') rainbowButton.classList.add('active');
  if (tool === 'eraser') eraserButton.classList.add('active');
}

function applyColor(cell) {
  if (!isDrawing && event.type !== 'mousedown') return;

  if (currentTool === 'rainbow') {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    cell.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
  } else if (currentTool === 'color') {
    cell.style.backgroundColor = currentColor;
  } else if (currentTool === 'eraser') {
    cell.style.backgroundColor = '#ffffff';
  }
}

function clearGrid() {
  const cells = grid.querySelectorAll('.cell');
  cells.forEach(cell => cell.style.backgroundColor = '#ffffff');
}

function buildGrid(size) {
  grid.innerHTML = '';
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.addEventListener('mousedown', () => applyColor(cell));
    cell.addEventListener('mouseover', () => applyColor(cell));
    grid.appendChild(cell);
  }
}

window.addEventListener('load', () => {
  sizeSlider.value = gridSize;
  sizeValue.textContent = `${gridSize} x ${gridSize}`;
  setTool('color');
  buildGrid(gridSize);
});
