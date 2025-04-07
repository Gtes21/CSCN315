// proj10.js

let startTime, timerInterval;
let correctCount = 0;
const gridSize = 3;
const totalPieces = gridSize * gridSize;
let originalOrder = [];
let shuffledOrder = [];

function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        document.getElementById("timer").textContent = `Time: ${elapsed}s`;
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

// Create grid of image tiles
function createPuzzleGrid(imageSrc) {
    const board = document.getElementById("puzzle-board");
    board.innerHTML = '';
    document.getElementById("message").textContent = '';
    correctCount = 0;

    originalOrder = Array.from({ length: totalPieces }, (_, i) => i);
    shuffledOrder = shuffleArray(originalOrder);

    for (let i = 0; i < totalPieces; i++) {
        const tile = document.createElement("div");
        tile.classList.add("puzzle-tile");
        tile.setAttribute("draggable", true);
        tile.setAttribute("data-index", shuffledOrder[i]);
        tile.setAttribute("data-correct", shuffledOrder[i]);

        tile.style.backgroundImage = `url('${imageSrc}')`;
        tile.style.backgroundSize = `${gridSize * 100}px ${gridSize * 100}px`;

        const row = Math.floor(shuffledOrder[i] / gridSize);
        const col = shuffledOrder[i] % gridSize;

        tile.style.backgroundPosition = `-${col * 100}px -${row * 100}px`;

        // Create drop zone for each correct position
        const dropZone = document.createElement("div");
        dropZone.classList.add("drop-zone");
        dropZone.setAttribute("data-correct", i);

        dropZone.addEventListener("dragover", dragOver);
        dropZone.addEventListener("drop", drop);

        tile.addEventListener("dragstart", dragStart);
        tile.addEventListener("dragend", dragEnd);

        dropZone.appendChild(tile);
        board.appendChild(dropZone);
    }

    startTimer();
}

// Drag-and-drop events
let draggedTile = null;

function dragStart(e) {
    draggedTile = this;
    setTimeout(() => this.style.visibility = "hidden", 0);
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
    const correctPos = dropZone.getAttribute("data-correct");
    const droppedIndex = draggedTile.getAttribute("data-index");

    // Allow only if drop zone is empty and this is the correct place
    if (correctPos === droppedIndex && dropZone.children.length === 0) {
        dropZone.appendChild(draggedTile);
        draggedTile.setAttribute("draggable", false);
        draggedTile.style.cursor = "default";
        correctCount++;

        if (correctCount === totalPieces) {
            stopTimer();
            document.getElementById("message").textContent = "🎉 Puzzle Solved!";
        }
    }
}

// Reset the game
function resetGame(imageSrc) {
    stopTimer();
    createPuzzleGrid(imageSrc);
}

// Main entry
document.addEventListener("DOMContentLoaded", () => {
    const fileInput = document.getElementById("imageInput");
    const resetBtn = document.getElementById("resetBtn");

    fileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = function (event) {
                createPuzzleGrid(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    });

    resetBtn.addEventListener("click", () => {
        const currentImage = document.querySelector(".puzzle-tile");
        if (currentImage) {
            const bg = currentImage.style.backgroundImage;
            const src = bg.slice(5, -2); // extract URL('...') safely
            resetGame(src);
        }
    });
});
