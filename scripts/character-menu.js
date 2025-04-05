// scripts/character-menu.js

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    
    const characterCards = document.querySelectorAll('.character-card');
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    let currentCharacterName = null;
    let mainContent = null;
    let backstoryContent = null;
    let mainTab = null;
    let backstoryTab = null;

    console.log('Found elements:', {
        characterCards: characterCards.length,
        tabButtons: tabButtons.length,
        tabPanes: tabPanes.length
    });

    // Debug tab buttons
    console.log('Tab buttons found:', tabButtons.length);
    tabButtons.forEach((button, index) => {
        console.log(`Tab button ${index}:`, {
            text: button.textContent,
            'data-tab': button.getAttribute('data-tab'),
            classList: button.classList.toString()
        });
    });

    // Add document-level click handler for debugging
    document.addEventListener('click', (event) => {
        console.log('Click detected on:', event.target);
        if (event.target.classList.contains('tab-button')) {
            console.log('Tab button clicked directly');
            const tabId = event.target.getAttribute('data-tab');
            console.log('Tab ID:', tabId);
            
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button
            event.target.classList.add('active');

            // Handle tab content switching
            if (tabId === 'main') {
                console.log('Switching to main tab');
                if (mainTab) {
                    mainTab.classList.add('active');
                }
            } else if (tabId === 'backstory') {
                console.log('Switching to backstory tab');
                loadBackstory();
            }
        }
    });

    characterCards.forEach(card => {
        card.addEventListener('click', () => {
            const characterName = card.getAttribute('data-name');
            console.log('Character card clicked:', characterName);
            currentCharacterName = characterName;
            fetchCharacterDetails(characterName);
        });
    });

    function fetchCharacterDetails(name) {
        console.log('Fetching character details for:', name);
        fetch(`/characters/${name}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(markdown => {
                const contentHTML = formatMarkdownToHTML(markdown);
                // Update our references to the content elements
                mainContent = document.getElementById('markdown-content');
                backstoryContent = document.getElementById('backstory-content');
                mainTab = document.getElementById('main-tab');
                backstoryTab = document.getElementById('backstory-tab');
                
                console.log('Updated element references:', {
                    mainContent: !!mainContent,
                    backstoryContent: !!backstoryContent,
                    mainTab: !!mainTab,
                    backstoryTab: !!backstoryTab
                });

                if (mainContent) {
                    mainContent.innerHTML = contentHTML;
                }
                
                // Ensure main tab is visible and backstory tab is hidden
                if (mainTab) {
                    mainTab.classList.add('active');
                }
                if (backstoryTab) {
                    backstoryTab.classList.remove('active');
                }
            })
            .catch(error => {
                console.error('Error fetching character content:', error);
                if (mainContent) {
                    mainContent.innerHTML = '<p>Error loading character details.</p>';
                }
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

    // Function to load backstory content
    function loadBackstory() {
        console.log('loadBackstory called');
        console.log('Current character name:', currentCharacterName);
        
        if (!currentCharacterName) {
            console.error('No character selected');
            return;
        }

        // Update our references to the content elements
        mainContent = document.getElementById('markdown-content');
        backstoryContent = document.getElementById('backstory-content');
        mainTab = document.getElementById('main-tab');
        backstoryTab = document.getElementById('backstory-tab');

        if (!backstoryContent || !backstoryTab) {
            console.error('Backstory elements not found');
            return;
        }

        const backstoryUrl = `/characters/backstories/${currentCharacterName}-backstory.md`;
        console.log('Fetching backstory from:', backstoryUrl);
        
        fetch(backstoryUrl)
            .then(response => {
                console.log('Response status:', response.status);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(markdown => {
                console.log('Received markdown content:', markdown);
                const html = formatMarkdownToHTML(markdown);
                
                // Set backstory content
                backstoryContent.innerHTML = html;
                
                // Hide main tab and show backstory tab
                if (mainTab) {
                    mainTab.classList.remove('active');
                }
                backstoryTab.classList.add('active');
            })
            .catch(error => {
                console.error('Error loading backstory:', error);
                if (backstoryContent) {
                    backstoryContent.innerHTML = '<p>No backstory available.</p>';
                }
                if (backstoryTab) {
                    backstoryTab.classList.add('active');
                }
            });
    }
});
