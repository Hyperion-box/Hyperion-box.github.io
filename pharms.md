---
layout: pharm-store
title: Pharmaceutical Market
---

<script>
document.addEventListener('DOMContentLoaded', function() {
    // Example product data - in a real application, this would come from a database
    const featuredProducts = [
        {
            name: "HACAN STIM-X PREMIUM",
            price: 15000,
            certification: "JOL-NAR APPROVED",
            description: "Military-grade combat stimulant with neural enhancement",
            stock: 127
        },
        // Add more featured products...
    ];

    // Function to render products
    function renderFeaturedProducts() {
        const grid = document.querySelector('.featured-grid');
        featuredProducts.forEach(product => {
            // Add product cards to the grid
        });
    }

    renderFeaturedProducts();
});
</script> 