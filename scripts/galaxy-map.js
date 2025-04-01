class GalaxyMap {
    constructor() {
        this.hexGrid = document.querySelector('.hex-grid');
        this.wormholeSvg = document.querySelector('.wormhole-svg');
        this.systems = {};
        this.tradeRoutes = []; // Array to store trade routes
        this.init();
    }

    async init() {
        await this.loadSystems();
        this.createHexGrid();
        this.applySystemData();
        this.setupEventListeners();
        this.drawPredefinedRoutes();
    }

    async loadSystems() {
        try {
            const response = await fetch('/data/systems.json');
            const data = await response.json();
            this.systems = data.systems;
            this.tradeRoutes = data.tradeRoutes || [];
            
            // Validate trade routes
            this.validateTradeRoutes();
        } catch (error) {
            console.error('Error loading systems:', error);
        }
    }

    validateTradeRoutes() {
        this.tradeRoutes = this.tradeRoutes.filter(route => {
            if (!route.systems || route.systems.length < 2) {
                console.warn(`Invalid trade route configuration: ${route.name || 'unnamed route'}`);
                return false;
            }
            
            // Check if all systems in the route exist
            const allSystemsExist = route.systems.every(systemId => 
                this.systems[systemId] !== undefined
            );
            
            if (!allSystemsExist) {
                console.warn(`Trade route ${route.name || 'unnamed route'} references non-existent systems`);
                return false;
            }
            
            return true;
        });
    }

    createHexGrid() {
        // Example 8x8 grid
        for (let i = 0; i < 56; i++) {
            const hex = document.createElement('div');
            hex.className = 'hex';
            const systemId = `7${(i + 1).toString().padStart(3, '0')}`;
            hex.setAttribute('data-system-id', systemId);
    
            // Create a border div
            const borderDiv = document.createElement('div');
            borderDiv.className = 'hex-border'; // New class for the border
    
            // Create SVG for hexagon
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('class', 'hex-svg');
            svg.setAttribute('viewBox', '0 0 100 100');
            svg.setAttribute('width', '170');
            svg.setAttribute('height', '170');
    
            const hexagon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
            hexagon.setAttribute('points', '50,5 95,25 95,75 50,95 5,75 5,25');
            hexagon.setAttribute('class', 'hexagon');
    
            svg.appendChild(hexagon);
    
            const content = document.createElement('div');
            content.className = 'hex-content';
            content.innerHTML = `
                <div class="hex-system-id">${systemId}</div>
                <div class="hex-text"></div>
            `;
    
            hex.appendChild(borderDiv); // Append the border div
            hex.appendChild(svg); // Append the SVG hexagon
            hex.appendChild(content);
            this.hexGrid.appendChild(hex);

            // Add click event listener to each hex
            hex.addEventListener('click', () => this.handleHexClick(systemId));
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
            if (systemData.type === 'Wormhole') {
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
            if (systemData.type === 'Blackhole') {
                const blackhole = document.createElement('div');
                blackhole.className = 'hex-blackhole'; // Add a class for styling
                blackhole.style.width = `${systemData.radius * 2}px`; // Diameter
                blackhole.style.height = `${systemData.radius * 2}px`; // Diameter
                blackhole.style.backgroundColor = systemData.color; // Black Hole color
                hex.appendChild(blackhole); // Append the black hole to the hex
            }
        }
            // Add image if available
    if (systemData.image) {
        let hexImage = hex.querySelector('.hex-image');
        if (!hexImage) {
            hexImage = document.createElement('div');
            hexImage.className = 'hex-image';
            hex.appendChild(hexImage);
        }
        hexImage.style.backgroundImage = `url(${systemData.image})`;
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

        // Close modal when the close button is clicked
        const closeModalBtn = document.querySelector('.system-close');
        
        closeModalBtn.onclick = function () {
            const modal = document.getElementById('system-modal');
            modal.style.display = 'none';
        };

        // Close all modals when clicking outside of the modal content
        window.onclick = function (event) {
            const modals = document.querySelectorAll('.modal'); // Select all modals
            modals.forEach(modal => {
                if (event.target === modal) {
                    modal.style.display = 'none'; // Close the modal
                }
            });
        };
    }
    

    handleHexClick(systemId) {
        const systemData = this.systems[systemId];
        if (systemData) {
            // Set modal title and description
            document.getElementById('modal-title').textContent = systemData.name || 'System Information';
            document.getElementById('modal-description').innerHTML = `
                <p><strong>Type:</strong> ${systemData.type || 'N/A'}</p>
                <p><strong>Details:</strong> ${systemData.details || 'No additional information available.'}</p>
            `;
            
            // Display the modal
            const modal = document.getElementById('system-modal');
            modal.style.display = 'block';
        }
    }

    // Add new method to get hex center coordinates
    getHexCenter(hex) {
        const rect = hex.getBoundingClientRect();
        const gridRect = this.hexGrid.getBoundingClientRect();
        
        // Calculate center point relative to the grid
        return {
            x: rect.left + rect.width / 0.5 - gridRect.left,
            y: rect.top + rect.height / 1 - gridRect.top
        };
    }

    // Add new method to draw predefined routes
    drawPredefinedRoutes() {
        // Clear existing routes
        this.clearTradeRoutes();

        // Draw new routes
        this.tradeRoutes.forEach(route => {
            // Draw connections between consecutive systems in the route
            for (let i = 0; i < route.systems.length - 1; i++) {
                const startSystemId = route.systems[i];
                const endSystemId = route.systems[i + 1];
                
                this.addTradeRoute(startSystemId, endSystemId, {
                    color: route.color,
                    width: route.width,
                    dashArray: route.dashArray,
                    speed: route.speed,
                    routeId: route.id,
                    routeName: route.name
                });
            }
        });

        // Add resize listener to redraw routes when window size changes
        window.addEventListener('resize', () => {
            this.drawPredefinedRoutes();
        });
    }

    // Update clearTradeRoutes to properly clean up
    clearTradeRoutes() {
        const routes = document.querySelectorAll('.trade-route');
        routes.forEach(route => route.remove());
    }

    // Update addTradeRoute to include route metadata
    addTradeRoute(startSystemId, endSystemId, options = {}) {
        const startHex = document.querySelector(`[data-system-id="${startSystemId}"]`);
        const endHex = document.querySelector(`[data-system-id="${endSystemId}"]`);
        
        if (!startHex || !endHex) {
            console.error('One or both systems not found for trade route');
            return;
        }

        const route = {
            start: startSystemId,
            end: endSystemId,
            color: options.color || '#FFD700',
            width: options.width || 3,
            dashArray: options.dashArray || '5,5',
            speed: options.speed || 2,
            routeId: options.routeId,
            routeName: options.routeName
        };

        this.drawTradeRoute(route);
    }

    drawTradeRoute(route) {
        const startHex = document.querySelector(`[data-system-id="${route.start}"]`);
        const endHex = document.querySelector(`[data-system-id="${route.end}"]`);
        
        if (!startHex || !endHex) {
            console.error('One or both systems not found for trade route');
            return;
        }

        // Use getHexCenter for more accurate positioning
        const startCenter = this.getHexCenter(startHex);
        const endCenter = this.getHexCenter(endHex);

        // Create SVG line element
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', startCenter.x);
        line.setAttribute('y1', startCenter.y);
        line.setAttribute('x2', endCenter.x);
        line.setAttribute('y2', endCenter.y);
        line.setAttribute('stroke', route.color);
        line.setAttribute('stroke-width', route.width);
        line.setAttribute('stroke-dasharray', route.dashArray);
        line.setAttribute('class', 'trade-route');
        line.setAttribute('data-route-id', route.routeId || '');
        line.setAttribute('data-route-name', route.routeName || '');
        line.style.strokeDashoffset = '1000';

        // Add to SVG container
        this.wormholeSvg.appendChild(line);

        // Animate the line
        this.animateTradeRoute(line, route);
    }

    animateTradeRoute(line, route) {
        let offset = 1000;
        const animate = () => {
            offset -= route.speed;
            if (offset < -1000) offset = 1000;
            line.style.strokeDashoffset = offset;
            requestAnimationFrame(animate);
        };
        animate();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const galaxyMap = new GalaxyMap();
    galaxyMap.setupModalClose(); // Call to set up modal close functionality
});


