export const gridSize = 50;
export let grid = document.getElementById('grid');
export const gridContainer = document.getElementById('grid-container');
for (let i = 0; i < 50 * 50; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    grid.appendChild(cell);
}

