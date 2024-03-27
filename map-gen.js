
//import { combinedGreenList } from 'map-resources/tiles.js';

let isGreenSelected = true; // Flag to track whether green or blue tiles are selected


const green = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 51];
const pokGreen = [52, 53, 54, 55, 56, 57, 58];
const blue = [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38];
const pokBlue = [59, 60, 61, 62, 63, 64, 65, 66, 69, 70, 71, 72, 73, 74, 75, 76];

const combinedGreenList = green.concat(pokGreen);
const combinedBlueList = blue.concat(pokBlue);

function selectTile(tileNumber) {
        const mapTiles = document.querySelectorAll('.map-tile');
        mapTiles.forEach(tile => {
            tile.addEventListener('click', () => {
                const selectedTile = document.querySelector('.tile-image.selected');
                if (selectedTile) {
                    tile.style.backgroundImage = `url('/images/tiles/ST_${selectedTile.dataset.tile}.png')`;
                    tile.dataset.tile = selectedTile.dataset.tile;


                    const previousTileNumber = parseInt(tile.dataset.tile);
                    const index = usedTiles.indexOf(previousTileNumber);
                    if (index !== -1) {
                        usedTiles.splice(index, 1);
                    }
    
                    // Add the new tile number to the usedTiles list
                    const newTileNumber = parseInt(selectedTile.dataset.tile);
                    usedTiles.push(newTileNumber);
    
                    // Print the updated usedTiles list
                    printUsedTiles(usedTiles);
                }
            });
        });
    }

function generateMap() {
    const mapString = document.getElementById('mapString').value;
    const mapContainer = document.getElementById('map-container');
    mapContainer.innerHTML = '';

    const tilePane = document.getElementById('tile-pane');
        tilePane.innerHTML = ''; // Clear previous content

    // Coordinates for each hexagon tile

    //top: add 45px for each row
    //left: add 160px for each tile
    const tileCoordinates = [
        { hs: "y", top: '1px', left: '240px' },   // Tile 1 HS

        { top: '46px', left: '160px' },  // Tile 2
        { top: '46px', left: '320px' },  // Tile 3

        { top: '93px', left: '80px' },   // Tile 4
        { top: '93px', left: '240px' }, // Tile 5
        { top: '93px', left: '400px' },  // Tile 6

        { hs: "y", top: '138px', left: '0px' },   // Tile 7 HS
        { top: '138px', left: '160px' }, // Tile 8
        { top: '138px', left: '320px' },  // Tile 9
        { hs: "y", top: '138px', left: '480px' },   // Tile 10 HS

        { top: '183px', left: '80px' }, // Tile 11
        { top: '183px', left: '240px' },  // Tile 12 
        { top: '183px', left: '400px' },   // Tile 13
        
        { top: '228px', left: '0px' }, // Tile 14
        { top: '228px', left: '160px' },  // Tile 15
        { top: '228px', left: '320px' },   // Tile 16
        { top: '228px', left: '480px' }, // Tile 17

        { top: '273px', left: '80px' },  // Tile 18
        { top: '273px', left: '240px' },   // Tile 19 MECATOL
        { top: '273px', left: '400px' }, // Tile 20

        { top: '318px', left: '0px' },  // Tile 21
        { top: '318px', left: '160px' },   // Tile 22
        { top: '318px', left: '320px' }, // Tile 23
        { top: '318px', left: '480px' },  // Tile 24

        { top: '363px', left: '80px' },   // Tile 25
        { top: '363px', left: '240px' }, // Tile 26
        { top: '363px', left: '400px' },  // Tile 27
        
        { hs: "y", top: '408px', left: '0px' },   // Tile 28 HS 
        { top: '408px', left: '160px' }, // Tile 29
        { top: '408px', left: '320px' },  // Tile 30
        { hs: "y", top: '408px', left: '480px' },   // Tile 31 HS

        { top: '453px', left: '80px' }, // Tile 32
        { top: '453px', left: '240px' },  // Tile 33
        { top: '453px', left: '400px' },   // Tile 34

        { top: '498px', left: '160px' }, // Tile 35
        { top: '498px', left: '320px' },  // Tile 36

        { hs: "y", top: '543px', left: '240px' },   // Tile 37 HS
    ];



let usedTiles = [];

for (let i = 0; i < tileCoordinates.length; i++) {
    const tileNumber = i + 1;
    const tile = document.createElement('div');

    let availableTiles;
    if (tileCoordinates[i].hs === 'y') {
        availableTiles = combinedGreenList.filter(tile => !usedTiles.includes(tile));
    } else { 
        availableTiles = combinedBlueList.filter(tile => !usedTiles.includes(tile));
    }

    // Check if there are available tiles to place
    if (availableTiles.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableTiles.length);
        const selectedTile = availableTiles[randomIndex];

        tile.style.backgroundImage = `url('/images/tiles/ST_${selectedTile}.png')`;

        // Add the selected tile to the used tiles array
        usedTiles.push(selectedTile);
    } else {
        // Handle case where no available tiles
        console.log("No available tiles to place.");
        
    }

    if (tileNumber === 19) {
      tile.style.backgroundImage = `url('/images/tiles/ST_18.png')`;
    }

    // Set other styles
    tile.style.top = tileCoordinates[i].top;
    tile.style.left = tileCoordinates[i].left;
    tile.classList.add('map-tile'); // Add the class here if needed

    // Set tile selection event listener
    tile.addEventListener('click', () => {
                tile.classList.toggle('selected'); // Toggle the 'selected' class
            });


    // Append the tile to the map container
    mapContainer.appendChild(tile);
    
    

// Create images for all tiles and append them to the tile pane

}

printUsedTiles(usedTiles);
selectTile(); // Call function to handle tile selection on the map
generateTilePane();
}
generateMap(); // Auto-generate map on page load




// Function to generate map based on a tile string
function generateMapFromTileString(tileString) {
    // Parse the tile string into an array of tile numbers
    const tileArray = tileString.split(', ').map(Number);
    // Generate the map using the tile array
    generateMap(tileArray);
}

// Example usage:
const tileString = '57, 75, 25, 37, 24, 21, 7, 29, 20, 8, 69, 28, 59, 32, 74, 65, 35, 34, 72, 36, 22, 71, 63, 62, 73, 33, 30, 56, 19, 27, 58, 76, 38, 31, 70, 61, 11';
generateMapFromTileString(tileString);




// Get a reference to the toggle button
const toggleButton = document.getElementById('toggle-button');

// Add an event listener to the button
toggleButton.addEventListener('click', toggleTiles);

// Function to toggle between green and blue tiles in the tile pane
function toggleTiles() {
    isGreenSelected = !isGreenSelected; // Toggle the flag

    // Change the text of the toggle button based on the current selection
    toggleButton.textContent = isGreenSelected ? 'Show Blue Tiles' : 'Show Green Tiles';

    // Regenerate the tile pane to display the selected tiles
    generateTilePane();
}




function generateTilePane() {
    
   
    console.log('Generating tile pane');
        const tilePane = document.getElementById('tile-pane');
        tilePane.innerHTML = ''; // Clear previous content

        // Determine which list to use based on the current selection
        const combinedTileList = isGreenSelected ? combinedGreenList : combinedBlueList;

        combinedTileList.forEach(tileNumber => {
            const tileImage = document.createElement('img');
            tileImage.src = `/images/tiles/ST_${tileNumber}.png`; // Adjust image path as needed
            tileImage.alt = `Tile ${tileNumber}`;
            tileImage.dataset.tile = tileNumber; // Set data attribute to store tile number
            tileImage.classList.add('tile-image'); // Add a class to the image

            tileImage.addEventListener('click', () => {
                const selectedTile = document.querySelector('.tile-image.selected');
                if (selectedTile) {
                    selectedTile.classList.remove('selected');
                }
                tileImage.classList.add('selected');
            });

            // Append the image to the tile pane
            tilePane.appendChild(tileImage);
        });
    }




function printUsedTiles(usedTiles) {
    const usedTilesString = "Used Tiles: " + usedTiles.join(', '); // Convert the array to a string separated by commas
    const tilesDisplayElement = document.getElementById('used-tiles-display'); // Get the element where you want to display the used tiles
    tilesDisplayElement.textContent = usedTilesString; // Set the text content of the element to the formatted string
}
