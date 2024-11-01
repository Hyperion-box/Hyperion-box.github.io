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
        for (let i = 0; i < 64; i++) {
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
}

document.addEventListener('DOMContentLoaded', () => {
    const galaxyMap = new GalaxyMap();
});