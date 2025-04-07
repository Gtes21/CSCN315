// proj10.js

let startTime;
let timerInterval;
let correctCount = 0;

// Start timer
function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    document.getElementById("timer").textContent = `Time: ${elapsed}s`;
  }, 1000);
}

// Stop timer
function stopTimer() {
  clearInterval(timerInterval);
}

// Shuffle array
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// Create puzzle pieces
function initPuzzle() {
  const board = document.getElementById("puzzle-board");
  board.innerHTML = '';
  correctCount = 0;
  document.getElementById("message").textContent = '';

  const pieces = [];
  for (let i = 0; i < 9; i++) pieces.push(i);

  shuffleArray(pieces);

  pieces.forEach((i, idx) => {
    const div = document.createElement("div");
    div.classList.add("puzzle-piece");
    div.setAttribute("draggable", true);
    div.setAttribute("data-id", i);
    div.style.backgroundImage = "url('concert.jpeg')";
    div.style.backgroundPosition = `-${(i % 3) * 100}px -${Math.floor(i / 3) * 100}px`;

    div.addEventListener("dragstart", dragStart);
    div.addEventListener("dragend", dragEnd);

    const slot = document.createElement("div");
    slot.classList.add("dropzone");
    slot.dataset.correct = i;
    slot.addEventListener("dragover", dragOver);
    slot.addEventListener("drop", drop);
    slot.appendChild(div);

    board.appendChild(slot);
  });

  startTimer();
}

// Drag & drop handlers
let draggedPiece;

function dragStart(e) {
  draggedPiece = this;
  setTimeout(() => this.style.display = 'none', 0);
}

function dragEnd() {
  draggedPiece.style.display = 'block';
  draggedPiece = null;
}

function dragOver(e) {
  e.preventDefault();
  this.classList.add("dragover");
}

function drop(e) {
  e.preventDefault();
  this.classList.remove("dragover");

  const droppedOn = this;
  const correctId = droppedOn.dataset.correct;
  const draggedId = draggedPiece.dataset.id;

  if (correctId === draggedId && droppedOn.children.length === 0) {
    droppedOn.appendChild(draggedPiece);
    draggedPiece.setAttribute("draggable", false);
    draggedPiece.style.cursor = "default";
    correctCount++;

    if (correctCount === 9) {
      stopTimer();
      document.getElementById("message").textContent = "🎉 Puzzle Completed!";
    }
  } else {
    // Optional: provide feedback for incorrect drop
  }
}

// Reset game
document.getElementById("resetBtn").addEventListener("click", () => {
  stopTimer();
  initPuzzle();
});

// Init game on load
document.addEventListener("DOMContentLoaded", () => {
  initPuzzle();
});
