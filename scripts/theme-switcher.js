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

    const mechanicsInfo = {
        "skill-checks": {
            title: "Skill Checks",
            description: `In Stars Without Number, skill checks are made by rolling 2d6 and adding the most applicable skill modifier. If you do not have any points in a skill and attempt a check, you apply -1. A 0 in a skill gets no bonus, a 1 gets +1 etc. <br><br>Aiding a skill check:<br>If someone wants to help another do a check, they can explain how and if agreed on, they can attempt to also roll the same check, if it passes then the original player gets a +1 to their check.
            If the total meets or exceeds the target number, the check is successful.`
        },
        "saving-throws": {
            title: "Saving Throws",
            description:
             "Saving throws are made to resist harmful effect. <br><br>Every characters base Saving Throw score is 15, and lowers by 1 after advancing a level (Level 1=15, Level 2=14 etc). You also add any modifiers you have, ie if you have Constitution 14, get +1 on Physical Save. <br><br>Roll 1d20 and add any attribute modifiers. If the result meets or exceeds the Saving Throw Score, you succeed. <br><br><br>Physical: Used for bodily resilience, like resisting poisons, disease, or enduring extreme pain. <br><br>Evasion: Used to dodge or avoid harm, such as escaping explosions or traps. <br><br>Mental: Used for resisting mental or psychic attacks, like fear or mind control. <br><br>Example: If a character is trying to dodge falling debris, they would roll an Evasion save. If their target number for Evasion is 15, they need to roll 15 or higher on a 1d20 to succeed and avoid the damage. <br><br><br>Modifers: Physical: Better of Strength or Constitution.<br>Evasion: Better of Dexterity or Intelligence.<br>Mental: Better of Charisma or Wisdom. <br><br><br>Attribute Score Modifiers:<br><br>3: -2<br>4-7: -1<br>8-13: 0<br>14-17: +1<br>18: +2"
        },
        "dice": {
            title: "Dice",
            description: "The game primarily uses 2d6 for most rolls. Other dice may be used for specific actions or effects. A d20 is used for saving throws."
        },
        "combat": {
            title: "Combat",
            description: "Combat is resolved in turns. Players roll for initiative and take actions based on their position in the turn order."
        },
        "leveling-up": {
            title: "Leveling Up and XP",
            description: "Characters gain experience points (XP) through successful missions and encounters. Accumulating enough XP allows characters to level up."
        },
        "ship-travel": {
            title: "Ship Travel",
            description: "Travel between systems is handled through ship mechanics, including navigation checks and fuel management."
        },
        "equipment-wealth": {
            title: "Equipment and Wealth",
            description: "Characters can acquire equipment and wealth through missions, trade, and exploration. Managing resources is key to survival."
        }
    };

    document.querySelectorAll('.popup-trigger').forEach(trigger => {
        trigger.addEventListener('click', function (e) {
            e.preventDefault();
            const mechanic = this.getAttribute('data-popup');
            popupTitle.textContent = mechanicsInfo[mechanic].title;
            popupDescription.innerHTML = mechanicsInfo[mechanic].description; // Use innerHTML here
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
});