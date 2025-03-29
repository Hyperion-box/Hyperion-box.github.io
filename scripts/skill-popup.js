document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('popup');
    const popupTitle = document.getElementById('popup-title');
    const popupDescription = document.getElementById('popup-description');
    const closeBtn = document.querySelector('.close');

    // Load skills data
    async function loadSkillsData() {
        try {
            const response = await fetch('/data/skills.json');
            const skills = await response.json();
            return skills;
        } catch (error) {
            console.error('Error loading skills data:', error);
            return {};
        }
    }

    // Initialize skill click handlers
    async function initializeSkillPopups() {
        const skills = await loadSkillsData();
        
        // Add click handlers to all skill elements
        document.querySelectorAll('.skill-name, .skill-link').forEach(skillElement => {
            skillElement.addEventListener('click', (e) => {
                e.preventDefault();
                const skillName = skillElement.textContent.trim();
                const skillData = skills[skillName];
                
                if (skillData) {
                    popupTitle.textContent = skillName;
                    popupDescription.innerHTML = `
                        <p><strong>Description:</strong> ${skillData.description}</p>
                        <p><strong>Examples:</strong> ${skillData.examples}</p>
                        ${skillData.specializations ? `<p><strong>Specializations:</strong> ${skillData.specializations}</p>` : ''}
                    `;
                    popup.style.display = 'block';
                }
            });
            
            // Add visual indicator that this is clickable
            skillElement.style.cursor = 'pointer';
            if (!skillElement.classList.contains('skill-interactive')) {
                skillElement.classList.add('skill-interactive');
            }
        });
    }

    // Close popup handlers
    closeBtn.onclick = function() {
        popup.style.display = 'none';
    };

    window.onclick = function(event) {
        if (event.target == popup) {
            popup.style.display = 'none';
        }
    };

    // Initialize popups
    initializeSkillPopups();
}); 