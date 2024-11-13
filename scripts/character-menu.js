// scripts/character-menu.js

document.addEventListener('DOMContentLoaded', () => {
    const characterCards = document.querySelectorAll('.character-card');
    const markdownContent = document.getElementById('markdown-content');

    characterCards.forEach(card => {
        card.addEventListener('click', () => {
            const characterName = card.getAttribute('data-name');
            fetchCharacterDetails(characterName);
        });
    });

    function fetchCharacterDetails(name) {
        fetch(`/characters/${name}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(markdown => {
                const contentHTML = formatMarkdownToHTML(markdown);
                markdownContent.innerHTML = contentHTML;
            })
            .catch(error => {
                console.error('Error fetching character content:', error);
                markdownContent.innerHTML = '<p>Error loading character details.</p>';
            });
    }

    function formatMarkdownToHTML(markdown) {
        const lines = markdown.split('\n');
        let html = '';
        let inFrontMatter = false;

        lines.forEach(line => {
            if (line.startsWith('---')) {
                inFrontMatter = !inFrontMatter;
                return;
            }

            if (!inFrontMatter) {
                if (line.startsWith('# ')) {
                    html += `<h2>${line.slice(2).trim()}</h2>`;
                } else {
                    html += `<p>${line.trim()}</p>`;
                }
            }
        });

        return html;
    }

    
});
document.addEventListener('DOMContentLoaded', () => {
    const equipmentHeader = document.getElementById('equipment-header');
    const equipmentDiv = document.getElementById('equipment');

    // Check if elements are found
    if (!equipmentHeader || !equipmentDiv) {
        console.error('Equipment header or div not found');
        return;
    }

    equipmentHeader.addEventListener('click', () => {
        // Toggle display property
        if (equipmentDiv.style.display === 'none' || equipmentDiv.style.display === '') {
            equipmentDiv.style.display = 'block'; // Show the equipment
        } else {
            equipmentDiv.style.display = 'none'; // Hide the equipment
        }
    });
});