
import { combinedGreenList } from 'map-resources/tiles.js';

function generateMap() {
    const mapContainer = document.getElementById('map-container');
    mapContainer.innerHTML = '';

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

//TODO create a list of tiles which can make up the board, then loop through it.



    for (let i = 0; i < tileCoordinates.length; i++) {
        const tileNumber = i + 1;
        const tile = document.createElement('div');
        tile.classList.add('map-tile');
        tile.style.top = tileCoordinates[i].top;
        tile.style.left = tileCoordinates[i].left;
        tile.style.backgroundImage = `url('/images/tiles/ST_${tileNumber}.png')`;
        if (tileNumber === 19){
          tile.style.backgroundImage = `url('/images/tiles/ST_18.png')`;
        }
        mapContainer.appendChild(tile);
    }


    function getRaceHomeTile () {
      const races = [];
        races[0]= "1"; //Sol
        races[1]= "2";
        races[2]= "3";
    }

}

generateMap(); // Auto-generate map on page load
