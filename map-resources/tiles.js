const green = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 51];
const pokGreen = [52, 53, 54, 55, 56, 57, 58];
const blue = [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38];
const pokBlue = [59, 60, 61, 62, 63, 64, 65, 66, 69, 70, 71, 72, 73, 74, 75, 76];
const red = [39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50];
const pokRed = [67, 68, 77, 78, 79, 80];
const anomaly = [41, 42, 43, 44, 45];
const pokAnomaly = [67, 68, 79, 80];
const blankRed = [39, 40, 46, 47, 48, 49, 50];
const pokBlankRed = [77, 78];
const alphaWormholes = [26, 39];
const pokAlphaWormholes = [79];
const betaWormholes = [25, 40];
const pokBetaWormholes = [64];
const asteroidFields = [44, 45];
const pokAsteroidFields = [79];
const gravityRifts = [41];
const pokGravityRifts = [67];
const nebulae = [42];
const pokNebulae = [68];
const supernovas = [43];
const pokSupernovas = [80];
const hyperlanes = ["83A", "83B", "84A", "84B", "85A", "85B", "86A", "86B", "87A", "87B", "88A", "88B", "89A", "89B", "90A", "90B", "91A", "91B"];


const combinedList = blue.concat(pokBlue);

module.exports = combinedList;

const randomTiles = getRandomTiles();


// Function to randomly select 30 unique numbers from the combined list
function getRandomTiles() {
    const combinedList = blue.concat(pokBlue);
    const randomTiles = [];
    
    // Create a copy of the combined list
    const copyList = combinedList.slice();
    
    // Shuffle the copy list
    for (let i = copyList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copyList[i], copyList[j]] = [copyList[j], copyList[i]];
    }
    
    // Select the first 30 unique numbers from the shuffled list
    for (let i = 0; i < copyList.length && randomTiles.length < 30; i++) {
        if (!randomTiles.includes(copyList[i])) {
            randomTiles.push(copyList[i]);
        }
    }
    
    return randomTiles;
}

module.exports = randomTiles;
