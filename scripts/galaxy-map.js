class GalaxyMap {
    constructor() {
        this.hexGrid = document.querySelector('.hex-grid');
        this.wormholeSvg = document.querySelector('.wormhole-svg');
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
            this.applyWormholeStyles(hex, systemData.type); // Apply styles based on type
            
            // New code to add a wormhole if the type is 'wormhole'
            if (systemData.type === 'wormhole') {
                const wormhole = document.createElement('div');
                wormhole.className = 'hex-wormhole'; // Add a class for styling
                wormhole.style.width = `${systemData.radius * 2}px`; // Diameter
                wormhole.style.height = `${systemData.radius * 2}px`; // Diameter
                wormhole.style.backgroundColor = systemData.color; // Wormhole color
                
                // Check for ion storm and apply ion storm styles
                if (systemData.isIonStorm) {
                    wormhole.classList.add('ion-storm'); // Add ion storm class
                }

                hex.appendChild(wormhole); // Append the wormhole to the hex
            }

            // New code to add a black hole if the type is 'blackhole'
            if (systemData.type === 'blackhole') {
                const blackhole = document.createElement('div');
                blackhole.className = 'hex-blackhole'; // Add a class for styling
                blackhole.style.width = `${systemData.radius * 2}px`; // Diameter
                blackhole.style.height = `${systemData.radius * 2}px`; // Diameter
                blackhole.style.backgroundColor = systemData.color; // Black Hole color
                hex.appendChild(blackhole); // Append the black hole to the hex
            }
        }
    }

    applyWormholeStyles(hex, type) {
        switch (type) {
            case 'alpha-wormhole':
                hex.classList.add('alpha-wormhole');
                break;
            case 'beta-wormhole':
                hex.classList.add('beta-wormhole');
                break;
            case 'gamma-wormhole':
                hex.classList.add('gamma-wormhole');
                break;
            default:
                break;
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

}

document.addEventListener('DOMContentLoaded', async () => {
    const galaxyMap = new GalaxyMap();

});


