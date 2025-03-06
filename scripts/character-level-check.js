async function loadCharacterData() {
    try {
        const levelResponse = await fetch('/data/experience-levels.json');
        const levelData = await levelResponse.json();

        const characterCards = document.querySelectorAll('.character-card');

        for (const card of characterCards) {
            const experienceElement = card.querySelector('#experience');
            const levelElement = card.querySelector('#level');
            const requiredXPElement = card.querySelector('#required-xp');

            if (!experienceElement || !levelElement || !requiredXPElement) continue;

            const experience = Number(experienceElement.textContent);
            const level = Number(levelElement.textContent);

            const requiredXP = getRequiredXP(levelData.levels, level);

            if (requiredXP !== null) {
                requiredXPElement.textContent = requiredXP;
            }

            updateCharacterXPBorder(card, experience, requiredXP);
        }
    } catch (error) {
        console.error('Error loading character data:', error);
    }
}

function getRequiredXP(levels, currentLevel) {
    const nextLevel = levels.find(level => level.level === currentLevel + 1);
    return nextLevel ? nextLevel.requiredXP : 0; // Return 0 if no next level
}

function updateCharacterXPBorder(card, currentXP, requiredXP) {
    if (requiredXP === 0) return;

    const progressPercentage = (currentXP / requiredXP) * 100;
    card.style.setProperty('--xp-progress', progressPercentage);
    card.classList.add('xp-border');
}

document.addEventListener('DOMContentLoaded', loadCharacterData);
