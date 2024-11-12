class GalaxyMap {
    constructor() {
        this.hexGrid = document.querySelector('.hex-grid');
        this.systems = {};
        this.init();
    }

    async init() {
        await this.loadSystems();
        this.createHexGrid();
        this.applySystemData();
        this.setupEventListeners();
    }

    async loadSystems() {
        try {
            const response = await fetch('/data/systems.json');
            const data = await response.json();
            this.systems = data.systems;
        } catch (error) {
            console.error('Error loading systems:', error);
        }
    }

    createHexGrid() {
        // Example 8x8 grid
        for (let i = 0; i < 136; i++) {
            const hex = document.createElement('div');
            hex.className = 'hex';
            const systemId = `system-${i}`;
            hex.setAttribute('data-system-id', systemId);

            // Create a border div
            const borderDiv = document.createElement('div');
            borderDiv.className = 'hex-border'; // New class for the border

            const content = document.createElement('div');
            content.className = 'hex-content';
            
            content.innerHTML = `
                <div class="hex-system-id">${systemId}</div>
                <div class="hex-text"></div>
            `;

            hex.appendChild(borderDiv); // Append the border div
            hex.appendChild(content);
            this.hexGrid.appendChild(hex);
        }
    }

    applySystemData() {
        // Apply data from systems.json to matching hexes
        Object.entries(this.systems).forEach(([systemId, systemData]) => {
            this.updateHexSystem(systemId, systemData);
        });
    }

    updateHexSystem(systemId, systemData) {
        const hex = document.querySelector(`[data-system-id="${systemId}"]`);
        if (!hex) return;

        const hexContent = hex.querySelector('.hex-content');
        const hexText = hexContent.querySelector('.hex-text');

        // Update hex appearance with CSS custom properties
        if (systemData.backgroundColor) {
            hex.style.setProperty('--hex-bg', systemData.backgroundColor);
        }
        if (systemData.borderColor) {
            hex.style.setProperty('--hex-border', systemData.borderColor);
        }

        if (systemData.name) {
            hexText.textContent = systemData.name;
        }
        if (systemData.textColor) {
            hexText.style.color = systemData.textColor;
        }

        // Add type as a data attribute if specified
        if (systemData.type) {
            hex.setAttribute('data-system-type', systemData.type);
        }
    }

    setupEventListeners() {
        this.hexGrid.addEventListener('click', (e) => {
            const hex = e.target.closest('.hex');
            if (hex) {
                const systemId = hex.getAttribute('data-system-id');
                this.handleHexClick(systemId);
            }
        });
    }

    handleHexClick(systemId) {
        console.log(`Clicked system: ${systemId}`);
        const systemData = this.systems[systemId];
        if (systemData) {
            console.log('System data:', systemData);
        }
    }

    // drawTriangleOnHex(systemId, direction) {
    //     const hex = document.querySelector(`[data-system-id="${systemId}"]`);
    //     if (!hex) {
    //         console.error(`Hex with systemId ${systemId} not found.`);
    //         return;
    //     }

    //     // Log to confirm the method is called
    //     console.log(`Drawing triangle on ${systemId} pointing ${direction}`);

    //     const hexSize = hex.offsetWidth; // Assuming hex is a regular hexagon
    //     const triangleSize = hexSize * 0.1; // Triangle size is 10% of hex size

    //     const triangle = document.createElement('div');
    //     triangle.className = 'triangle'; // Add a class for styling
    //     triangle.style.width = 0;
    //     triangle.style.height = 0;
    //     triangle.style.borderLeft = `${triangleSize}px solid transparent`;
    //     triangle.style.borderRight = `${triangleSize}px solid transparent`;
    //     triangle.style.borderBottom = `${triangleSize}px solid black`; // Change color as needed
    //     triangle.style.position = 'absolute';
    //     triangle.style.zIndex = 5;

    //     // Calculate position based on direction
    //     const hexRect = hex.getBoundingClientRect();
    //     switch (direction) {
    //         case 'n':
    //             triangle.style.left = `${hexRect.left + hexSize / 2 - triangleSize}px`;
    //             triangle.style.top = `${hexRect.top}px`;
    //             break;
    //         case 'ne':
    //             triangle.style.left = `${hexRect.left + hexSize}px`;
    //             triangle.style.top = `${hexRect.top + hexSize / 4}px`;
    //             break;
    //         case 'e':
    //             triangle.style.left = `${hexRect.left + hexSize}px`;
    //             triangle.style.top = `${hexRect.top + hexSize / 2 - triangleSize}px`;
    //             break;
    //         case 'se':
    //             triangle.style.left = `${hexRect.left + hexSize}px`;
    //             triangle.style.top = `${hexRect.top + hexSize * 3 / 4}px`;
    //             break;
    //         case 's':
    //             triangle.style.left = `${hexRect.left + hexSize / 2 - triangleSize}px`;
    //             triangle.style.top = `${hexRect.top + hexSize}px`;
    //             break;
    //         case 'sw':
    //             triangle.style.left = `${hexRect.left - triangleSize}px`;
    //             triangle.style.top = `${hexRect.top + hexSize * 3 / 4}px`;
    //             break;
    //         case 'w':
    //             triangle.style.left = `${hexRect.left - triangleSize}px`;
    //             triangle.style.top = `${hexRect.top + hexSize / 2 - triangleSize}px`;
    //             break;
    //         case 'nw':
    //             triangle.style.left = `${hexRect.left - triangleSize}px`;
    //             triangle.style.top = `${hexRect.top + hexSize / 4}px`;
    //             break;
    //         default:
    //             console.error('Invalid direction specified');
    //             return;
    //     }

    //     triangle.style.backgroundColor = 'red'; // Temporary for debugging
    //     hex.appendChild(triangle);
    // }
}

document.addEventListener('DOMContentLoaded', async () => {
    const galaxyMap = new GalaxyMap();

});


