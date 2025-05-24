// Rank thresholds
const RANKS = [
    { name: 'Bronze', points: 0, image: 'rank-images/1 Bronze Rank.png' },
    { name: 'Gold', points: 100, image: 'rank-images/3 Gold Rank.webp' },
    { name: 'Grandmaster', points: 500, image: 'rank-images/6 Grandmaster Rank.webp' },
    { name: 'Eternity', points: 1000, image: 'rank-images/8 Eternity Rank.webp' },
    { name: 'One Above All', points: 2000, image: 'rank-images/9 One Above All Rank.webp' }
];

// Achievements
const ACHIEVEMENTS = [
    {
        id: 'first_win',
        title: 'First Victory',
        description: 'Successfully guess your first hero',
        condition: (stats) => stats.totalWins >= 1
    },
    {
        id: 'bronze_master',
        title: 'Bronze Master',
        description: 'Reach Bronze rank',
        condition: (stats) => stats.points >= 0
    },
    {
        id: 'gold_master',
        title: 'Gold Master',
        description: 'Reach Gold rank',
        condition: (stats) => stats.points >= 100
    },
    {
        id: 'grandmaster',
        title: 'Grandmaster',
        description: 'Reach Grandmaster rank',
        condition: (stats) => stats.points >= 500
    },
    {
        id: 'eternity',
        title: 'Eternity',
        description: 'Reach Eternity rank',
        condition: (stats) => stats.points >= 1000
    },
    {
        id: 'one_above_all',
        title: 'One Above All',
        description: 'Reach the highest rank',
        condition: (stats) => stats.points >= 2000
    }
];

// Initialize account page
function initAccount() {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        window.location.href = 'login.html';
        return;
    }

    // Load user data
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userData = users.find(u => u.username === user.username);

    if (userData) {
        updateUserInfo(userData);
        updateStats(userData);
        updateProgress(userData);
        updateAchievements(userData);
    }
}

// Update user information
function updateUserInfo(userData) {
    document.querySelector('.username').textContent = userData.username;
}

// Update stats display
function updateStats(userData) {
    // Update rank
    const currentRank = getCurrentRank(userData.points);
    document.getElementById('rankImage').src = currentRank.image;
    document.getElementById('rankName').textContent = currentRank.name;

    // Update score
    document.getElementById('totalScore').textContent = userData.points || 0;

    // Update level
    document.getElementById('currentLevel').textContent = userData.level || 1;
}

// Update progress bar
function updateProgress(userData) {
    const currentRank = getCurrentRank(userData.points);
    const nextRank = RANKS.find(r => r.points > currentRank.points) || currentRank;

    const pointsInCurrentRank = userData.points - currentRank.points;
    const pointsNeededForNextRank = nextRank.points - currentRank.points;
    const progressPercentage = (pointsInCurrentRank / pointsNeededForNextRank) * 100;

    document.getElementById('rankProgress').style.width = `${progressPercentage}%`;
    document.getElementById('pointsNeeded').textContent = nextRank.points - userData.points;
}

// Update achievements
function updateAchievements(userData) {
    const achievementsGrid = document.getElementById('achievementsGrid');
    achievementsGrid.innerHTML = '';

    ACHIEVEMENTS.forEach(achievement => {
        const isUnlocked = achievement.condition(userData);
        const achievementCard = document.createElement('div');
        achievementCard.className = `achievement-card ${isUnlocked ? 'unlocked' : 'locked'}`;

        achievementCard.innerHTML = `
            <h4>${achievement.title}</h4>
            <p>${achievement.description}</p>
            <span class="achievement-status">${isUnlocked ? 'Unlocked' : 'Locked'}</span>
        `;

        achievementsGrid.appendChild(achievementCard);
    });
}

// Get current rank based on points
function getCurrentRank(points) {
    return RANKS.reduce((current, rank) => {
        return points >= rank.points ? rank : current;
    }, RANKS[0]);
}

// Logout function
function logout() {
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initAccount); 