// Message handling and display
class CommsSystem {
    constructor() {
        this.messages = [];
        this.currentFilter = 'all';
        this.selectedMessage = null;
        this.init();
    }

    async init() {
        await this.loadMessages();
        this.setupEventListeners();
        this.renderMessageList();
    }



    setupEventListeners() {
        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.setFilter(btn.dataset.filter);
            });
        });

        // Search input
        const searchInput = document.querySelector('.search-input');
        searchInput.addEventListener('input', (e) => {
            this.filterMessages(e.target.value);
        });
    }

    setFilter(filter) {
        this.currentFilter = filter;
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        this.renderMessageList();
    }

    filterMessages(searchTerm = '') {
        return this.messages.filter(message => {
            const matchesFilter = this.currentFilter === 'all' || 
                                message.priority === this.currentFilter ||
                                message.tags.includes(this.currentFilter);
            
            const matchesSearch = searchTerm === '' ||
                                message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                message.from.toLowerCase().includes(searchTerm.toLowerCase());
            
            return matchesFilter && matchesSearch;
        });
    }

    

}

// Initialize the comms system when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const messageCards = document.querySelectorAll('.message-card');
    const messageContent = document.getElementById('message-content');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.querySelector('.search-input');
    let currentFilter = 'all';

    // Filter messages
    function filterMessages(searchTerm = '') {
        messageCards.forEach(card => {
            const matchesFilter = currentFilter === 'all' || 
                                card.dataset.priority === currentFilter ||
                                card.dataset.tags.includes(currentFilter);
            
            const matchesSearch = searchTerm === '' ||
                                card.querySelector('.message-subject').textContent.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                card.querySelector('.meta-value').textContent.toLowerCase().includes(searchTerm.toLowerCase());
            
            card.style.display = matchesFilter && matchesSearch ? 'flex' : 'none';
        });
    }

    // Handle filter button clicks
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            currentFilter = btn.dataset.filter;
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterMessages(searchInput.value);
        });
    });

    // Handle search input
    searchInput.addEventListener('input', (e) => {
        filterMessages(e.target.value.toLowerCase());
    });

    // Handle message selection
    messageCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove selected class from all cards
            messageCards.forEach(c => c.classList.remove('selected'));
            
            // Add selected class to clicked card
            card.classList.add('selected');

            // Get message content from the markdown file
            const messageUrl = card.dataset.url;
            fetchMessageContent(messageUrl);
        });
    });

    function fetchMessageContent(url) {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(markdown => {
                const contentHTML = formatMarkdownToHTML(markdown);
                messageContent.innerHTML = contentHTML;
            })
            .catch(error => {
                console.error('Error fetching message content:', error);
                messageContent.innerHTML = '<p>Error loading message details.</p>';
            });
    }

    function formatMarkdownToHTML(markdown) {
        const lines = markdown.split('\n');
        let html = '';
        let inFrontMatter = false;
        let metadata = {};

        lines.forEach(line => {
            if (line.startsWith('---')) {
                inFrontMatter = !inFrontMatter;
                return;
            }

            if (inFrontMatter) {
                const [key, value] = line.split(':').map(s => s.trim());
                metadata[key] = value;
            } else {
                if (line.startsWith('# ')) {
                    html += `<h2>${line.slice(2).trim()}</h2>`;
                } else if (line.startsWith('## ')) {
                    html += `<h3>${line.slice(3).trim()}</h3>`;
                } else if (line.startsWith('### ')) {
                    html += `<h4>${line.slice(4).trim()}</h4>`;
                } else if (line.startsWith('> ')) {
                    html += `<blockquote>${line.slice(2).trim()}</blockquote>`;
                } else if (line.trim()) {
                    html += `<p>${line.trim()}</p>`;
                }
            }
        });

        // Add metadata to the top of the content
        const metadataHTML = `
            <div class="message-header">
            </div>
        `;

        return metadataHTML + html;
    }
}); 