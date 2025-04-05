// scripts/character-menu.js

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    
    const characterCards = document.querySelectorAll('.character-card');
    let currentCharacterName = null;
    let mainContent = null;
    let backstoryContent = null;
    let mainTab = null;
    let backstoryTab = null;
    let tabButtons = null;
    let tabPanes = null;

    function updateElementReferences() {
        tabButtons = document.querySelectorAll('.tab-button');
        tabPanes = document.querySelectorAll('.tab-pane');
        mainContent = document.getElementById('markdown-content');
        backstoryContent = document.getElementById('backstory-content');
        mainTab = document.getElementById('main-tab');
        backstoryTab = document.getElementById('backstory-tab');

        console.log('Updated element references:', {
            tabButtons: tabButtons.length,
            tabPanes: tabPanes.length,
            mainContent: !!mainContent,
            backstoryContent: !!backstoryContent,
            mainTab: !!mainTab,
            backstoryTab: !!backstoryTab
        });
    }

    // Initial element references
    updateElementReferences();

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
                    loadCharacterDetails('character');
                } else {
                    console.error('Main tab not found');
                }
            } else if (tabId === 'backstory') {
                console.log('Switching to backstory tab');
                if (backstoryTab) {
                    backstoryTab.classList.add('active');
                    loadCharacterDetails('backstory');
                } else {
                    console.error('Backstory tab not found');
                }
            }
        }
    });

    characterCards.forEach(card => {
        card.addEventListener('click', () => {
            const characterName = card.getAttribute('data-name');
            console.log('Character card clicked:', characterName);
            currentCharacterName = characterName;
            loadCharacterDetails('character');
        });
    });

    function loadCharacterDetails(contentType) {
        console.log('loadCharacterDetails called for:', contentType);
        console.log('Current character name:', currentCharacterName);
        
        if (!currentCharacterName) {
            console.error('No character selected');
            return;
        }

        let contentElement = null;
        let url = '';

        if (contentType === 'character') {
            contentElement = mainContent;
            url = `/characters/${currentCharacterName}`;
        } else if (contentType === 'backstory') {
            contentElement = backstoryContent;
            url = `/characters/backstories/${currentCharacterName}-backstory.md`;
        }

        console.log('Content element:', contentElement);
        console.log('URL to fetch:', url);

        if (!contentElement) {
            console.error(`${contentType} content element not found`);
            return;
        }

        console.log('Fetching content from:', url);
        
        fetch(url)
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
                
                // Clear existing content before setting new content
                contentElement.innerHTML = '';
                contentElement.innerHTML = html;
                console.log('Content updated successfully');

                // Update element references after content is loaded
                updateElementReferences();
            })
            .catch(error => {
                console.error('Error loading content:', error);
                contentElement.innerHTML = `<p>Error loading ${contentType} content.</p>`;
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
