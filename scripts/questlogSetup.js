import { quests } from './questlog.js';

//questlog
document.getElementById('questlog-button').addEventListener('click', () => {
    console.log('clicked');
    const overlay = document.getElementById('quest-overlay');
    const text = document.getElementById('quest-text');
  
     // Clear the existing quests
    text.innerHTML = '';

    // Iterate over the quests array
    quests.forEach(quest => {
        // Create a div for the quest
        const questDiv = document.createElement('div');
        questDiv.id = 'questDiv';

        // Add a class to the div
        questDiv.classList.add('quest');

        // Set the inner HTML of the div
        questDiv.innerHTML = `
            <h2>${quest.name}</h2>
            <h3>${quest.system}</h3>
            <p>${quest.description}</p>
        `;

        // Append the div to the quest text
        text.appendChild(questDiv);
    });

    overlay.style.left = '0';

});
