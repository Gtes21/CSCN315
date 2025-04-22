// final2.js – Puzzle Game Logic

let startTime, timerInterval;
let correctCount = 0;
const gridSize = 3;
const totalPieces = gridSize * gridSize;

function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const timer = document.getElementById("timer");
    if (timer) timer.textContent = `Time: ${elapsed}s`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function createPuzzleGrid(imageSrc) {
  const board = document.getElementById("puzzle-board");
  if (!board) return;

  board.innerHTML = '';
  document.getElementById("message").textContent = '';
  document.getElementById("timer").textContent = 'Time: 0s';
  correctCount = 0;

  const positions = Array.from({ length: totalPieces }, (_, i) => i);
  const shuffled = shuffleArray(positions);

  // Create drop zones
  shuffled.forEach((originalIndex, i) => {
    const dropZone = document.createElement("div");
    dropZone.classList.add("drop-zone");
    dropZone.dataset.correct = i;
    dropZone.addEventListener("dragover", dragOver);
    dropZone.addEventListener("drop", drop);

    const tile = document.createElement("div");
    tile.classList.add("puzzle-tile");
    tile.setAttribute("draggable", true);
    tile.dataset.original = originalIndex;

    const row = Math.floor(originalIndex / gridSize);
    const col = originalIndex % gridSize;

    tile.style.backgroundImage = `url('${imageSrc}')`;
    tile.style.backgroundSize = `${gridSize * 100}px ${gridSize * 100}px`;
    tile.style.backgroundPosition = `-${col * 100}px -${row * 100}px`;

    tile.addEventListener("dragstart", dragStart);
    tile.addEventListener("dragend", dragEnd);

    dropZone.appendChild(tile);
    board.appendChild(dropZone);
  });

  startTimer();
}

let draggedTile = null;

function dragStart(e) {
  draggedTile = this;
  setTimeout(() => (this.style.visibility = "hidden"), 0);
}

function dragEnd(e) {
  this.style.visibility = "visible";
  draggedTile = null;
}

function dragOver(e) {
  e.preventDefault();
}

function drop(e) {
  e.preventDefault();
  const dropZone = this;

  if (!draggedTile) return;

  const correctPos = parseInt(dropZone.dataset.correct);
  const tile = dropZone.firstElementChild;

  // Allow if empty or swap
  if (!tile) {
    dropZone.appendChild(draggedTile);
  } else {
    const fromZone = draggedTile.parentElement;
    fromZone.appendChild(tile);
    dropZone.appendChild(draggedTile);
  }

  checkPuzzleCompletion();
}

function checkPuzzleCompletion() {
  const allZones = document.querySelectorAll('.drop-zone');
  let solved = 0;

  allZones.forEach(zone => {
    const correctPos = parseInt(zone.dataset.correct);
    const tile = zone.firstElementChild;
    if (tile && parseInt(tile.dataset.original) === correctPos) {
      tile.setAttribute("draggable", false);
      tile.style.cursor = "default";
      solved++;
    } else if (tile) {
      tile.setAttribute("draggable", true);
      tile.style.cursor = "grab";
    }
  });

  if (solved === totalPieces) {
    stopTimer();
    document.getElementById("message").textContent = "🎉 Puzzle Solved!";
    document.querySelector(".puzzle-board").style.gap = "0";
  }
}

// Main init
document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("imageInput");
  const resetBtn = document.getElementById("resetBtn");

  fileInput?.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => createPuzzleGrid(event.target.result);
      reader.readAsDataURL(file);
    }
  });

  resetBtn?.addEventListener("click", () => {
    const tile = document.querySelector(".puzzle-tile");
    if (tile) {
      const src = tile.style.backgroundImage.slice(5, -2); // strip url("")
      createPuzzleGrid(src);
    }
  });
});
