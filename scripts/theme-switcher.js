document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    
    // Check for saved theme preference, otherwise use device preference
    const savedTheme = getCookie('theme') || 
        (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    
    // Apply saved theme on load
    setTheme(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        setCookie('theme', newTheme, 365); // Save preference for 1 year
    });

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
    }

    function setCookie(name, value, days) {
        const expires = new Date(Date.now() + days * 864e5).toUTCString();
        document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
    }

    function getCookie(name) {
        return document.cookie.split('; ').reduce((r, v) => {
            const parts = v.split('=');
            return parts[0] === name ? decodeURIComponent(parts[1]) : r;
        }, '');
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const popup = document.getElementById('popup');
    const popupTitle = document.getElementById('popup-title');
    const popupDescription = document.getElementById('popup-description');
    const closeBtn = document.querySelector('.close');

    // Function to fetch Markdown and convert it to HTML using your custom function
    async function loadMarkdown(file) {
        const response = await fetch(file);
        const text = await response.text();
        return formatMarkdownToHTML(text); // Use your custom function here
    }

    document.querySelectorAll('.popup-trigger').forEach(trigger => {
        trigger.addEventListener('click', async function (e) {
            e.preventDefault();
            const mechanic = this.getAttribute('data-popup');
            const markdownFile = `/swn-help/${mechanic}.md`; // Use an absolute path
            // Load the Markdown file and set the content
            popupTitle.textContent = mechanic.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()); // Capitalize title
            popupDescription.innerHTML = await loadMarkdown(markdownFile);
            popup.style.display = 'block';
        });
    });

    closeBtn.onclick = function () {
        popup.style.display = 'none';
    };

    window.onclick = function (event) {
        if (event.target == popup) {
            popup.style.display = 'none';
        }
    };

    // Function to convert Markdown to HTML
    function formatMarkdownToHTML(markdown) {
        const lines = markdown.split('\n');
        let html = '';
        let inFrontMatter = false;
        let inCodeBlock = false;
        let inList = false;
        let inTable = false;
        let isHeaderRow = false;
    
        lines.forEach(line => {
            if (line.startsWith('---')) {
                inFrontMatter = !inFrontMatter;
                return;
            }
    
            if (inFrontMatter) return;
    
            // Handle code blocks
            if (line.startsWith('```')) {
                inCodeBlock = !inCodeBlock;
                html += inCodeBlock ? '<pre><code>' : '</code></pre>';
                return;
            }
    
            if (inCodeBlock) {
                html += `${line}\n`;
                return;
            }
    
            // Handle headers
            const headerMatch = line.match(/^(#{1,6})\s+(.*)$/);
            if (headerMatch) {
                closeListsAndTable();
                const level = headerMatch[1].length;
                const content = headerMatch[2];
                html += `<h${level}>${content}</h${level}>`;
                return;
            }
    
            // Handle unordered lists
            if (line.startsWith('- ')) {
                closeListsAndTable();
                if (!inList) {
                    html += '<ul>';
                    inList = true;
                }
                html += `<li>${line.slice(2).trim()}</li>`;
                return;
            }
    
            // Handle ordered lists
            const orderedListMatch = line.match(/^\d+\.\s+(.*)$/);
            if (orderedListMatch) {
                closeListsAndTable();
                if (!inList) {
                    html += '<ol>';
                    inList = true;
                }
                html += `<li>${orderedListMatch[1]}</li>`;
                return;
            }
    
            if (inList && !line.trim()) {
                html += inList ? '</ul>' : '</ol>';
                inList = false;
            }
    
            // Handle blockquotes
            if (line.startsWith('> ')) {
                closeListsAndTable();
                html += `<blockquote>${line.slice(2).trim()}</blockquote>`;
                return;
            }
    
            // Handle tables
            const tableRowMatch = line.match(/^\|(.+)\|$/);
            const separatorRowMatch = line.match(/^\|\s*[-:]+\s*\|(?:\s*[-:]+\s*\|)*$/);
    
            if (tableRowMatch) {
                const cells = tableRowMatch[1].split('|').map(cell => cell.trim());
    
                if (!inTable) {
                    html += '<table>';
                    inTable = true;
                    isHeaderRow = true;
                }
    
                if (isHeaderRow && separatorRowMatch) {
                    html += '<thead><tr>';
                    cells.forEach(cell => {
                        html += `<th>${cell}</th>`;
                    });
                    html += '</tr></thead>';
                    isHeaderRow = false;
                } else {
                    if (isHeaderRow) {
                        html += '<thead><tr>';
                        cells.forEach(cell => {
                            html += `<th>${cell}</th>`;
                        });
                        html += '</tr></thead>';
                        isHeaderRow = false;
                    } else {
                        html += '<tbody><tr>';
                        cells.forEach(cell => {
                            html += `<td>${cell}</td>`;
                        });
                        html += '</tr></tbody>';
                    }
                }
                return;
            }
    
            // Close tables if the line does not belong to a table
            if (inTable && !tableRowMatch && !separatorRowMatch) {
                html += '</table>';
                inTable = false;
            }
    
            // **Bold**, *Italic*, ***Bold + Italic***
            line = line
                .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>') // Bold + Italic
                .replace(/___(.*?)___/g, '<strong><em>$1</em></strong>') // Bold + Italic
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
                .replace(/__(.*?)__/g, '<strong>$1</strong>') // Bold
                .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic
                .replace(/_(.*?)_/g, '<em>$1</em>'); // Italic
    
            // Handle paragraphs
            if (line.trim()) {
                html += `<p>${line.trim()}</p>`;
            }
        });
    
        // Close any open lists or tables
        closeListsAndTable();
    
        function closeListsAndTable() {
            if (inList) {
                html += inList ? '</ul>' : '</ol>';
                inList = false;
            }
            if (inTable) {
                html += '</table>';
                inTable = false;
            }
        }
    
        return html;
    }
    
    
    
});
