document.addEventListener('DOMContentLoaded', () => {
    const missionLinks = document.querySelectorAll('.mission-link');
    const missionDetails = document.getElementById('mission-details');

    missionLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            fetchMissionDetails(link.href);
        });
    });

    async function fetchMissionDetails(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const content = await response.text();

            const parser = new DOMParser();
            const doc = parser.parseFromString(content, 'text/html');
            
            // Find the main content of the page
            const mainContent = doc.querySelector('main') || doc.querySelector('body');
            
            if (mainContent) {
                missionDetails.innerHTML = mainContent.innerHTML;
            } else {
                missionDetails.innerHTML = '<p>Error: Could not load mission details.</p>';
            }
        } catch (error) {
            console.error('Error fetching mission details:', error);
            missionDetails.innerHTML = '<p>Error: Could not load mission details. Please try again later.</p>';
        }
    }
});

