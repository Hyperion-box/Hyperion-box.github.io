import {
    systems
} from './systems.js';
const gridSize = 50;
const grid = document.getElementById('grid');
for (let i = 0; i < 50 * 50; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    grid.appendChild(cell);
}

systems.forEach(system => {
    // Create a point for the system
    const point = document.createElement('div');
    point.classList.add('point');
    point.classList.add(system.type); // Add the system type as a class
    point.style.left = `${system.x / 50 * 100}%`;
    point.style.top = `${system.y / 50 * 100}%`;

    // Create an info window for the system
    const info = document.createElement('div');
    info.classList.add('info');
    info.textContent = `System: ${system.label}`;

    // Create a label for the system
    const label = document.createElement('div');
    label.setAttribute('class', 'label');
    label.textContent = system.name;
    label.style.position = 'absolute';
    label.style.left = `${system.x / 0 * 100}%`;
    label.style.top = `${system.y / 0 * 100}%`;
    label.style.transform = 'translate(-50%, -50%)'; // Center the label
    label.style.zIndex = '1'; // Ensure the label is on top
    grid.appendChild(label);

    // Add the point, label and info window to the cell
    const cell = grid.children[system.y * 40 + system.x];
    cell.appendChild(point);
    cell.appendChild(label);
    cell.appendChild(info);

    // Add hover and click events to the cell
    //cell.addEventListener('mouseover', () => info.style.display = 'block');
    cell.addEventListener('mouseout', () => info.style.display = 'none');
    cell.addEventListener('click', () => {
        const overlay = document.getElementById('overlay');
        const text = document.getElementById('text');
        text.textContent = info.textContent;

        let img = overlay.querySelector('img');

        if (img) {
            // If an img element exists, update its src attribute
            img.src = system.image;
        } else {
            // If no img element exists, create a new one and append it to the overlay
            img = document.createElement('img');
            img.src = system.image;
            overlay.appendChild(img);
        }
    
        overlay.style.right = '0';

    });

    // Add an event listener to the overlay to hide it when clicked
    const overlay = document.getElementById('overlay');
    overlay.addEventListener('click', () => {
        overlay.style.right = '-40%';
    });
    const closeButton = document.getElementById('close');
    closeButton.addEventListener('click', () => {
        overlay.style.right = '-40%';
    });
});

let firstCell = null;
let secondCell = null;

grid.addEventListener('contextmenu', function(event) {
    event.preventDefault();

    if (firstCell === null) {
        firstCell = event.target;
    } else if (secondCell === null) {
        secondCell = event.target;
        drawLine(firstCell, secondCell);
        firstCell = null;
        secondCell = null;
    }
});

function drawLine(cell1, cell2) {
    const line = document.createElement('div');
    line.style.position = 'absolute';
    const cellWidth = cell1.offsetWidth;
    const cellHeight = cell1.offsetHeight;
    const x1 = cell1.offsetLeft + cellWidth / 2;
    const y1 = cell1.offsetTop + cellHeight / 2;
    const x2 = cell2.offsetLeft + cellWidth / 2;
    const y2 = cell2.offsetTop + cellHeight / 2;
    line.style.width = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)) + 'px';
    line.style.height = '4px';
    line.style.background = 'yellow';
    line.style.transform = 'rotate(' + Math.atan2(y2 - y1, x2 - x1) + 'rad)';
    line.style.transformOrigin = '0 0';
    line.style.left = x1 + 'px';
    line.style.top = y1 + 'px';
    grid.appendChild(line);
}

const coordinatesWindow = document.getElementById('coordinates-window');
const coordinatesText = document.getElementById('coordinates-text');

grid.addEventListener('mouseover', function(event) {
    const rect = grid.getBoundingClientRect();
    const x = event.clientX - rect.left; // x position within the grid
    const y = event.clientY - rect.top; // y position within the grid

    // Convert pixel coordinates to grid coordinates
    const gridX = Math.floor(x / (rect.width / gridSize));
    const gridY = Math.floor(y / (rect.height / gridSize));

    coordinatesText.textContent = `X: ${gridX}, Y: ${gridY}`;
    coordinatesWindow.style.display = 'block';
    verticalLine.style.display = 'block';
    horizontalLine.style.display = 'block';
    cursorCircle.style.display = 'block';
});

grid.addEventListener('mouseout', function() {
    coordinatesWindow.style.display = 'none';
    verticalLine.style.display = 'none';
    horizontalLine.style.display = 'none';
    cursorCircle.style.display = 'none';
});


// Create the lines
const verticalLine = document.createElement('div');
verticalLine.id = 'vertical-line';
grid.appendChild(verticalLine);

const horizontalLine = document.createElement('div');
horizontalLine.id = 'horizontal-line';
grid.appendChild(horizontalLine);
const cursorCircle = document.createElement('div');
cursorCircle.id = 'cursor-circle';
grid.appendChild(cursorCircle);

// Update the position of the lines on mousemove
grid.addEventListener('mousemove', function(event) {
    const rect = grid.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY + 409;

    verticalLine.style.left = x + 'px';
    horizontalLine.style.top = y + 'px';
    cursorCircle.style.left = (x - cursorCircle.offsetWidth / 2) + 'px';
    cursorCircle.style.top = (y - cursorCircle.offsetHeight / 2) + 'px';
});


