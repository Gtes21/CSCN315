// proj10.js

let startTime, timerInterval;
let correctCount = 0;
const gridSize = 3;
const totalPieces = gridSize * gridSize;
let positions = [];

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

function createPuzzleGrid(imageSrc) {
    const board = document.getElementById("puzzle-board");
    board.innerHTML = '';
    document.getElementById("message").textContent = '';
    document.getElementById("timer").textContent = 'Time: 0s';
    document.querySelector(".puzzle-board").style.gap = "1px";
    correctCount = 0;

    positions = Array.from({ length: totalPieces }, (_, i) => i);
    const shuffled = shuffleArray(positions);

    // Create drop zones first
    for (let i = 0; i < totalPieces; i++) {
        const dropZone = document.createElement("div");
        dropZone.classList.add("drop-zone");
        dropZone.dataset.position = i;

        dropZone.addEventListener("dragover", dragOver);
        dropZone.addEventListener("drop", drop);

        board.appendChild(dropZone);
    }

    // Create shuffled tiles
    shuffled.forEach((originalIndex) => {
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

        const availableDropZones = document.querySelectorAll(".drop-zone");
        const randomSlot = availableDropZones[Math.floor(Math.random() * availableDropZones.length)];

        if (!randomSlot.hasChildNodes()) {
            randomSlot.appendChild(tile);
        } else {
            board.appendChild(tile); // Fallback in case random spot was filled
        }
    });

    startTimer();
}

// Drag-and-drop logic
let draggedTile = null;

function dragStart(e) {
    draggedTile = this;
    setTimeout(() => (this.style.visibility = 'hidden'), 0);
}

function dragEnd(e) {
    this.style.visibility = 'visible';
    draggedTile = null;
}

function dragOver(e) {
    e.preventDefault();
    this.classList.add("dragover");
}

function drop(e) {
    e.preventDefault();
    this.classList.remove("dragover");

    if (!draggedTile) return;

    const dropZone = this;

    // Allow swapping if target is empty or occupied
    if (dropZone.children.length === 0) {
        dropZone.appendChild(draggedTile);
    } else {
        const existingTile = dropZone.firstElementChild;
        const parentOfDragged = draggedTile.parentElement;

        dropZone.appendChild(draggedTile);
        parentOfDragged.appendChild(existingTile);
    }

    checkCompletion();
}

function checkCompletion() {
    const allZones = document.querySelectorAll('.drop-zone');
    let solved = 0;

    allZones.forEach(zone => {
        const correctPos = parseInt(zone.dataset.position);
        const tile = zone.firstElementChild;

        if (tile && parseInt(tile.dataset.original) === correctPos) {
            solved++;
            tile.setAttribute("draggable", false);
            tile.style.cursor = "default";
        } else if (tile) {
            tile.setAttribute("draggable", true);
            tile.style.cursor = "grab";
        }
    });

    if (solved === totalPieces) {
        stopTimer();
        document.getElementById("message").textContent = "🎉 Puzzle Solved!";

        // Remove tile borders for a seamless finish
        document.querySelectorAll(".drop-zone").forEach(zone => {
            zone.style.border = "none";
        });

        document.querySelectorAll(".puzzle-tile").forEach(tile => {
            tile.style.border = "none";
        });

        // Remove grid gaps to merge images perfectly
        document.querySelector(".puzzle-board").style.gap = "0";
    }
}

// Reset
function resetGame(imageSrc) {
    stopTimer();
    createPuzzleGrid(imageSrc);
}

// Init handlers
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
        const currentTile = document.querySelector(".puzzle-tile");
        if (currentTile) {
            const bg = currentTile.style.backgroundImage;
            const src = bg.slice(5, -2);
            resetGame(src);
        }
    });
});
