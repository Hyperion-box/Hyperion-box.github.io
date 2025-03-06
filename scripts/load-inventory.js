// scripts/load-inventory.js

async function loadInventory() {
    try {
        const response = await fetch('/data/ship-inventory.json');
        const inventory = await response.json();
        document.getElementById('total-credits').textContent = inventory.shipInventory.credits;
        document.getElementById('total-fuel').textContent = inventory.shipInventory.fuel.amount;

        // Update the fuel level meter
        const fuelAmount = inventory.shipInventory.fuel.amount;
        const maxFuel = 5000; // Set this to the maximum fuel capacity
        const fuelLevel = (fuelAmount / maxFuel) * 100; // Calculate percentage
        document.getElementById('fuel-level').style.width = fuelLevel + '%'; // Set the width of the fuel level
    } catch (error) {
        console.error('Error loading inventory:', error);
    }
}

// Call loadInventory on page load
document.addEventListener('DOMContentLoaded', loadInventory);