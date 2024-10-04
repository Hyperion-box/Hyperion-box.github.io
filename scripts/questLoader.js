import { marked } from 'marked';

export async function loadQuests() {
    const mainMissions = await fetchQuests('missions/quests');
    const assignments = await fetchQuests('missions/side-quests');

    displayQuests('main-mission-list', mainMissions);
    displayQuests('assignment-list', assignments);
}

async function fetchQuests(directory) {
    const response = await fetch(`/api/quests?directory=${directory}`);
    return await response.json();
}

function displayQuests(listId, quests) {
    const list = document.getElementById(listId);
    list.innerHTML = '';

    quests.forEach(quest => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="#" data-quest="${quest.file}">${quest.title}</a>`;
        li.querySelector('a').addEventListener('click', (e) => {
            e.preventDefault();
            loadQuestContent(quest.file);
        });
        list.appendChild(li);
    });
}

async function loadQuestContent(questFile) {
    const response = await fetch(`/api/quest-content?file=${questFile}`);
    const markdown = await response.text();
    const content = marked(markdown);

    const contentArea = document.createElement('div');
    contentArea.innerHTML = content;
    
    // Replace the current tab content with the quest content
    const activeTab = document.querySelector('.tab-content.active');
    activeTab.innerHTML = '';
    activeTab.appendChild(contentArea);
}
