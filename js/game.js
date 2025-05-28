// Game state
let currentHero = null;
let currentHints = [];
let revealedHintCount = 0; // Track number of revealed hints
let usedHeroes = new Set();
let score = 0;
let level = 1;

// Hero data from heroes.txt
const heroes = [
    {
        name: "Iron Man",
        image: "assets/heroes/iron-man_prestige.webp",
        audio: "assets/audio/iron-man.mp3",
        hints: [
            "Wears a high-tech red and gold suit.",
            "Uses an arc reactor to power his armor.",
            "Can fly and shoot repulsor blasts.",
            "Often leads the charge in battles.",
            "Known for his sarcasm and engineering genius."
        ]
    },
    {
        name: "Spider-Man",
        image: "assets/heroes/spider-man_prestige.webp",
        audio: "assets/audio/spider-man.mp3",
        hints: [
            "Swings through the city using web-shooters.",
            "Has enhanced agility and reflexes.",
            "Warned by a special danger sense.",
            "Wears a red and blue suit with a spider emblem.",
            "Balances hero work with a personal life."
        ]
    },
    {
        name: "Captain America",
        image: "assets/heroes/captain-america_prestige.webp",
        audio: "assets/audio/captain-america.mp3",
        hints: [
            "Carries an indestructible shield.",
            "Fights for justice and freedom.",
            "Wears a suit themed around the American flag.",
            "Has super-soldier strength and speed.",
            "Often seen leading others into battle."
        ]
    },
    {
        name: "Thor",
        image: "assets/heroes/thor_prestige.webp",
        audio: "assets/audio/thor.mp3",
        hints: [
            "Controls thunder and lightning.",
            "Wields a powerful enchanted hammer.",
            "Is a god from a mystical realm.",
            "Can fly using his hammer.",
            "Speaks in a regal and formal tone."
        ]
    },
    {
        name: "Black Widow",
        image: "assets/heroes/black-widow_prestige.webp",
        audio: "assets/audio/black-widow.mp3",
        hints: [
            "A master of stealth and espionage.",
            "Uses gadgets and martial arts in combat.",
            "Wears a sleek black tactical suit.",
            "Was once a secret agent.",
            "Works well in covert operations."
        ]
    },
    {
        name: "Hulk",
        image: "assets/heroes/hulk_prestige.webp",
        audio: "assets/audio/hulk.mp3",
        hints: [
            "Transforms into a massive green powerhouse.",
            "Driven by anger and raw strength.",
            "Smashes obstacles with ease.",
            "Hard to injure due to extreme durability.",
            "Has a calm scientist form when not angry."
        ]
    },
    {
        name: "Doctor Strange",
        image: "assets/heroes/doctor-strange_prestige.webp",
        audio: "assets/audio/doctor-strange.mp3",
        hints: [
            "Protects the world from mystical threats.",
            "Wields spells and magical artifacts.",
            "Can open portals to other dimensions.",
            "Lives in a mystical New York mansion.",
            "Often battles dark and supernatural forces."
        ]
    },
    {
        name: "Scarlet Witch",
        image: "assets/heroes/scarlet-witch_prestige.webp",
        audio: "assets/audio/scarlet-witch.mp3",
        hints: [
            "Harnesses chaos magic.",
            "Can alter reality itself.",
            "Uses red energy spells in battle.",
            "Power grows with her emotional state.",
            "Has a history of both heroism and destruction."
        ]
    },
    {
        name: "Black Panther",
        image: "assets/heroes/black-panther_prestige.webp",
        audio: "assets/audio/black-panther.mp3",
        hints: [
            "Wears a vibranium-enhanced suit.",
            "Has enhanced senses and agility.",
            "Fights to protect a secretive nation.",
            "Uses clawed gloves in combat.",
            "Draws strength from a sacred herb."
        ]
    },
    {
        name: "Wolverine",
        image: "assets/heroes/wolverine_prestige.webp",
        audio: "assets/audio/wolverine.mp3",
        hints: [
            "Has metal claws that retract from his hands.",
            "Heals rapidly from injuries.",
            "Known for being gruff and fierce.",
            "Often works solo despite being on a team.",
            "Has an animalistic fighting style."
        ]
    },
    {
        name: "Magneto",
        image: "assets/heroes/magneto_prestige.webp",
        audio: "assets/audio/magneto.mp3",
        hints: [
            "Controls metal and magnetic fields.",
            "Believes mutants should lead the world.",
            "Wears a distinctive red and purple outfit.",
            "Often clashes with former allies.",
            "Can bend steel and fly using his powers."
        ]
    },
    {
        name: "Storm",
        image: "assets/heroes/storm_prestige.webp",
        audio: "assets/audio/storm.mp3",
        hints: [
            "Commands the weather with her mind.",
            "Can summon lightning and windstorms.",
            "Wears a cape and white hair.",
            "Flies using wind currents.",
            "Respected as a queen and leader."
        ]
    },
    {
        name: "Loki",
        image: "assets/heroes/loki_prestige.webp",
        audio: "assets/audio/loki.mp3",
        hints: [
            "Uses illusions and deception in battle.",
            "Fights with daggers and sorcery.",
            "Related to a thunder-wielding hero.",
            "Often changes sides between good and evil.",
            "Speaks in an eloquent and cunning way."
        ]
    },
    {
        name: "Groot",
        image: "assets/heroes/groot_prestige.webp",
        audio: "assets/audio/groot.mp3",
        hints: [
            "Speaks using only three words.",
            "Can grow and regrow tree-like limbs.",
            "Allies with a small raccoon.",
            "Sacrifices himself for friends when needed.",
            "Is a member of a cosmic team."
        ]
    },
    {
        name: "Rocket Raccoon",
        image: "assets/heroes/rocket-raccoon_prestige.webp",
        audio: "assets/audio/rocket-raccoon.mp3",
        hints: [
            "Uses high-powered guns and gadgets.",
            "Has a quick temper and sharp tongue.",
            "Flies ships with expert precision.",
            "Stands shorter than other heroes.",
            "Often paired with a tree-like companion."
        ]
    },
    {
        name: "Invisible Woman",
        image: "assets/heroes/invisible-woman_prestige.webp",
        audio: "assets/audio/invisible-woman.mp3",
        hints: [
            "Can turn herself and others invisible.",
            "Creates force fields for offense and defense.",
            "Member of a famous heroic family.",
            "Often leads missions with calm strategy.",
            "Wears a blue suit with a number logo."
        ]
    },
    {
        name: "Mr. Fantastic",
        image: "assets/heroes/mister-fantastic_prestige.webp",
        audio: "assets/audio/mr-fantastic.mp3",
        hints: [
            "Can stretch his body into any shape.",
            "One of the smartest people alive.",
            "Invents advanced machines and tech.",
            "Works with a team wearing blue uniforms.",
            "Known for thinking through every problem."
        ]
    },
    {
        name: "Hawkeye",
        image: "assets/heroes/hawkeye_prestige.webp",
        audio: "assets/audio/hawkeye.mp3",
        hints: [
            "Uses a bow with a variety of arrows.",
            "Rarely misses his target.",
            "Has no superpowers but fights alongside gods.",
            "Wears shades of purple in his outfit.",
            "Trains others in precision shooting."
        ]
    },
    {
        name: "Psylocke",
        image: "assets/heroes/psylocke_prestige.webp",
        audio: "assets/audio/psylocke.mp3",
        hints: [
            "Fights using psychic energy blades.",
            "Highly skilled in martial arts.",
            "Reads minds and manipulates thoughts.",
            "Moves quickly and strikes with precision.",
            "Has a ninja-like appearance."
        ]
    },
    {
        name: "Luna Snow",
        image: "assets/heroes/luna-snow_prestige.webp",
        audio: "assets/audio/luna-snow.mp3",
        hints: [
            "Uses ice powers in combat.",
            "Can heal allies and freeze enemies.",
            "Performs as a pop star when not fighting.",
            "Combines K-pop style with superhero action.",
            "Wields both beauty and strength on the field."
        ]
    }
];


// Initialize game
function initGame() {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    // Load user's progress
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userData = users.find(u => u.username === user.username);
    if (userData) {
        score = userData.points || 0;
        level = userData.level || 1;
        updateScoreDisplay();
        updateLevelDisplay(); // Ensure level display is updated on load
    }

    // Add event listener for Next Hint button
    document.getElementById('nextHint').addEventListener('click', revealNextHint);
    document.getElementById('skipHero').addEventListener('click', skipHero);

    // Start new round
    startNewRound();
}

// Start a new round
function startNewRound() {
    // Select a random hero that hasn't been used
    const availableHeroes = heroes.filter(h => !usedHeroes.has(h.name));
    if (availableHeroes.length === 0) {
        // Reset used heroes if all have been used
        usedHeroes.clear();
        return startNewRound();
    }

    // Reset hint count and clear hints container
    revealedHintCount = 0;
    document.querySelector('.hints-container').innerHTML = '';

    // Show the Next Hint button
    document.getElementById('nextHint').style.display = 'block';

    // Select random hero
    currentHero = availableHeroes[Math.floor(Math.random() * availableHeroes.length)];
    currentHints = [...currentHero.hints];
    usedHeroes.add(currentHero.name);

    // Update hero options
    updateHeroOptions();
}

// Reveal the next hint
function revealNextHint() {
    if (revealedHintCount < currentHints.length) {
        const hintElement = document.createElement('div');
        hintElement.className = 'hint';
        hintElement.textContent = currentHints[revealedHintCount];
        document.querySelector('.hints-container').appendChild(hintElement);
        revealedHintCount++;

        // Hide the Next Hint button when all hints are revealed
        if (revealedHintCount >= currentHints.length) {
            document.getElementById('nextHint').style.display = 'none';
        }
    }
}

// Update hero options (buttons)
function updateHeroOptions() {
    const heroButtonsContainer = document.querySelector('.hero-buttons');
    heroButtonsContainer.innerHTML = ''; // Clear previous buttons

    // Get random incorrect options
    const incorrectOptions = getRandomIncorrectOptions(7); // Get 7 incorrect options for a total of 8 buttons

    // Add correct option
    const allOptions = [...incorrectOptions, currentHero.name];
    shuffleArray(allOptions);

    allOptions.forEach(option => {
        const button = document.createElement('button');
        button.className = 'hero-button'; // Use the class for styling
        button.innerHTML = `<span>${option}</span>`; // Text inside the span for styling
        button.addEventListener('click', () => checkAnswer(option));
        heroButtonsContainer.appendChild(button);
    });
}

// Get random incorrect options
function getRandomIncorrectOptions(count) {
    const incorrectOptions = [];
    const availableHeroes = heroes.filter(h => h.name !== currentHero.name);

    while (incorrectOptions.length < count && incorrectOptions.length < availableHeroes.length) {
        const randomHero = availableHeroes[Math.floor(Math.random() * availableHeroes.length)];
        if (!incorrectOptions.includes(randomHero.name)) {
            incorrectOptions.push(randomHero.name);
        }
    }
    return incorrectOptions;
}

// Shuffle array (Fisher-Yates Shuffle)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Handle checking the answer
function checkAnswer(selectedOption) {
    if (selectedOption === currentHero.name) {
        handleCorrectAnswer();
    } else {
        handleWrongAnswer();
    }
}

// Function to show popup message
function showMessage(type, title, message, callback = null) {
    const popup = document.getElementById('messagePopup');
    const titleElement = document.getElementById('messageTitle');
    const messageElement = document.getElementById('messageText');
    const closeButton = document.getElementById('messageClose');

    // Set message content
    titleElement.textContent = title;
    messageElement.textContent = message;

    // Set popup type (success, error, or skip)
    popup.className = 'message-popup ' + type;

    // Show popup
    popup.classList.add('active');

    // Handle close button click
    const closePopup = () => {
        popup.classList.remove('active');
        if (callback) {
            callback();
        }
    };

    closeButton.onclick = closePopup;
}

// Handle correct answer
function handleCorrectAnswer() {
    // Add points (more points for fewer hints used)
    const pointsEarned = Math.max(10, 50 - (revealedHintCount * 5));
    score += pointsEarned;
    updateScoreDisplay();

    // Show hero image
    const heroImage = document.getElementById('heroImage');
    heroImage.style.backgroundImage = `url(${currentHero.image})`;
    heroImage.classList.add('active');

    // Play hero audio
    const audio = new Audio(currentHero.audio);
    audio.play();

    // Check for level up
    checkLevelUp();

    // Show success message
    showMessage('success', 'Correct!', `It was ${currentHero.name}! You earned ${pointsEarned} points.`, () => {
        // Start countdown
        let timeLeft = 8;
        const countdownDisplay = document.querySelector('.countdown-display');
        countdownDisplay.style.display = 'block';

        const countdownInterval = setInterval(() => {
            timeLeft--;
            countdownDisplay.textContent = `Next round in: ${timeLeft}s`;

            if (timeLeft <= 0) {
                clearInterval(countdownInterval);
                countdownDisplay.style.display = 'none';
                // Hide hero image and start new round
                heroImage.classList.remove('active');
                heroImage.style.backgroundImage = 'none';
                startNewRound();
            }
        }, 1000);
    });
}

// Function to determine user's rank based on score
function getUserRank() {
    if (score >= 10000) return 'One Above All';
    if (score >= 5000) return 'Eternity';
    if (score >= 2000) return 'Grand Master';
    if (score >= 1000) return 'Gold';
    return 'Bronze';
}

// Function to get penalty based on rank
function getRankPenalty() {
    const rank = getUserRank();
    switch (rank) {
        case 'One Above All':
            return 500;
        case 'Eternity':
            return 200;
        case 'Grand Master':
            return 100;
        case 'Gold':
            return 50;
        default: // Bronze
            return 10;
    }
}

// Handle wrong answer
function handleWrongAnswer() {
    // Get penalty based on rank
    const penalty = getRankPenalty();
    const oldScore = score;
    score = Math.max(0, score - penalty);

    // Update score display
    updateScoreDisplay();

    // Show feedback with rank-specific penalty
    const rank = getUserRank();
    showMessage('error', 'Wrong Answer!', `As a ${rank} rank player, you lost ${penalty} points. Your score decreased from ${oldScore} to ${score}.`);
}

// Skip hero functionality
function skipHero() {
    showMessage('skip', 'Hero Skipped', `You skipped ${currentHero.name}.`, () => {
        // Optional: penalize score for skipping
        score = Math.max(0, score - 2);
        updateScoreDisplay();
        startNewRound();
    });
}

// Update score display
function updateScoreDisplay() {
    const scoreDisplay = document.querySelector('.score-display');
    if (scoreDisplay) {
        scoreDisplay.textContent = `Score: ${score}`;
    }
    // Save score to localStorage (optional, for persistence)
    saveUserData();
}

// Check for level up
function checkLevelUp() {
    // Define level thresholds (example: 100, 300, 600, etc.)
    const levelThresholds = [100, 300, 600, 1000, 1500, 2000];
    let nextLevel = level;
    for (const threshold of levelThresholds) {
        if (score >= threshold) {
            nextLevel++;
        } else {
            break;
        }
    }

    if (nextLevel > level) {
        level = nextLevel;
        showMessage('success', 'Level Up!', `Congratulations! You've reached level ${level}!`);
        updateLevelDisplay();
    }
}

// Update level display
function updateLevelDisplay() {
    const levelDisplay = document.querySelector('.level-display');
    if (levelDisplay) {
        levelDisplay.textContent = `Level: ${level}`;
    }
}

// Save user data to local storage
function saveUserData() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex(u => u.username === user.username);
        if (userIndex !== -1) {
            users[userIndex].points = score;
            users[userIndex].level = level;
            // Save other relevant game state if needed
            localStorage.setItem('users', JSON.stringify(users));
        }
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', initGame); 
