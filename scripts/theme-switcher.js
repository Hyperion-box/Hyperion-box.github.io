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
            description: `<p>In <strong>Stars Without Number</strong>, skill checks are made by rolling <strong>2d6</strong> and adding the most applicable skill modifier. If you do not have any points in a skill and attempt a check, you apply -1. A score of 0 in a skill gets no bonus, while a score of 1 gives +1, etc.</p><p><strong>Aiding a skill check:</strong> If someone wants to help another do a check, they can explain how, and if agreed upon, they can attempt to roll the same check. If it passes, the original player gets a +1 to their check. If the total meets or exceeds the target number, the check is successful.</p><p><strong>Example:</strong> If you have the skill "Pilot: 1", you will get +1 to your roll result.</p>`
        },
        "saving-throws": {
            title: "Saving Throws",
            description:
             "<p>Saving throws are made to resist harmful effects.</p><table><tr><th>Level</th><th>Base Saving Throw Score</th></tr><tr><td>1</td><td>15</td></tr><tr><td>2</td><td>14</td></tr><tr><td>3</td><td>13</td></tr><tr><td>4</td><td>12</td></tr><tr><td>5</td><td>11</td></tr><tr><td>6+</td><td>10 or lower</td></tr></table><p>You also add any modifiers you have. For example, if you have Constitution 14, you get +1 on Physical Saves.</p><h3>Rolling a Saving Throw</h3><p>Roll 1d20 and add any attribute modifiers. If the result meets or exceeds the Saving Throw Score, you succeed.</p><h3>Types of Saving Throws</h3><ul><li><strong>Physical:</strong> Resists bodily harm (e.g., poisons, disease).</li><li><strong>Evasion:</strong> Avoids harm (e.g., escaping explosions).</li><li><strong>Mental:</strong> Resists mental attacks (e.g., fear, mind control).</li></ul><h3>Example</h3><p>If a character is trying to dodge falling debris, they would roll an Evasion save. If their target number for Evasion is 15, they need to roll 15 or higher on a 1d20 to succeed.</p><h3>Modifiers</h3><table><tr><th>Type</th><th>Modifier</th></tr><tr><td>Physical</td><td>Better of Strength or Constitution</td></tr><tr><td>Evasion</td><td>Better of Dexterity or Intelligence</td></tr><tr><td>Mental</td><td>Better of Charisma or Wisdom</td></tr></table><h3>Attribute Score Modifiers</h3><table><tr><th>Score Range</th><th>Modifier</th></tr><tr><td>3</td><td>-2</td></tr><tr><td>4-7</td><td>-1</td></tr><tr><td>8-13</td><td>0</td></tr><tr><td>14-17</td><td>+1</td></tr><tr><td>18</td><td>+2</td></tr></table>"
        },
        "combat": {
            title: "Combat",
            description: "<p><strong>Combat Overview:</strong> Combat is turn-based, consisting of six-second rounds where each character acts in initiative order.</p><p><strong>Actions:</strong> During your turn, you can perform various actions:</p><ul><li><em>Main Action</em>: such as attacking or using a skill</li><li><em>Move Action</em>: to move or dodge</li><li><em>On Turn Actions</em>: which are free actions Free actions like dropping an item or speaking</li><li><em>Instant Actions</em>: like parrying or using abilities</li></ul><p><strong>Attacking:</strong> To make an attack, roll 1d20 and add your Attack Bonus. Compare the total to the target's Armor Class (AC). If you hit, roll for weapon damage, using Dexterity for ranged attacks and Strength or Dexterity for melee attacks. Remember that various modifiers may apply, such as those for distance or cover.</p><p><strong>Common Actions:</strong> These include:</p><ul><li>Melee or ranged attacks</li><li>Snap attacks (A rushed attack at a penalty)</li><li>Fighting withdrawal (Disengage from melee without provoking attacks)</li><li>Skill usage (Perform an action like first aid or hacking)</li></ul><p><strong>Injury & Death:</strong> If a player character (PC) is reduced to 0 hit points (HP), they become incapacitated and must succeed on saving throws to stabilize. Failing these checks can lead to death. Additionally, massive damage, critical injuries, or a lack of immediate medical aid can result in permanent death. Healing is a slow process that requires rest, advanced medical equipment, or professional care.</p>"
        },
        "death": {
            title: "Death",
            description: "<p><strong>Death Saving Rolls</strong> determine whether an incapacitated character at 0 HP stabilizes, remains in critical condition, or dies. Here’s how they work:</p><p><strong>Trigger:</strong> When a PC is reduced to 0 HP, they become unconscious and begin making death saving rolls at the start of each of their turns unless they receive immediate healing or medical assistance.</p><p><strong>Roll Mechanic:</strong> Roll a d20 each turn:</p><ul><li>10 or higher: The character succeeds.</li><li>Below 10: The character fails.</li></ul><p><strong>Success and Failure Thresholds:</strong></p><ul><li>3 successes: The PC stabilizes, regaining consciousness after 1d4 hours (or sooner with medical care).</li><li>3 failures: The PC dies permanently.</li></ul><p><strong>Critical Rolls:</strong></p><ul><li>Natural 20: Instantly stabilize and regain 1 HP.</li><li>Natural 1: Counts as 2 failures.</li></ul><p><strong>Interruptions:</strong> If the PC takes further damage while at 0 HP (e.g., from an attack or hazard), they automatically fail one death saving roll. Massive damage equal to their max HP in a single hit results in instant death.</p><p><strong>Stabilization:</strong> Once stabilized, the PC no longer makes death saving rolls but remains unconscious until healed.</p>"
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