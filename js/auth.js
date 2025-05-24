// Check if user is logged in
function checkAuth() {
    const user = localStorage.getItem('user');
    const navLinks = document.querySelector('.nav-links ul');
    const getStartedBtn = document.querySelector('.cta-buttons .primary-btn');

    if (user) {
        // Update navigation for logged-in users
        if (navLinks) {
            // Remove login/register buttons
            const authLinks = navLinks.querySelectorAll('.login-btn, .register-btn');
            authLinks.forEach(link => link.parentElement.remove());

            // Add My Account link if it doesn't exist
            if (!navLinks.querySelector('.user-menu')) {
                const userMenu = document.createElement('li');
                userMenu.innerHTML = `
                    <a href="my-account.html" class="user-menu">
                        <span>My Account</span>
                    </a>
                `;
                navLinks.appendChild(userMenu);
            }
        }

        // Update Get Started button to point to game
        if (getStartedBtn) {
            getStartedBtn.href = 'game.html';
        }
    } else {
        // Update navigation for logged-out users
        if (navLinks) {
            // Remove My Account link if it exists
            const userMenu = navLinks.querySelector('.user-menu');
            if (userMenu) {
                userMenu.remove();
            }

            // Add login/register buttons if they don't exist
            if (!navLinks.querySelector('.login-btn')) {
                const loginLi = document.createElement('li');
                loginLi.innerHTML = '<a href="login.html" class="login-btn">Login</a>';
                navLinks.appendChild(loginLi);
            }
            if (!navLinks.querySelector('.register-btn')) {
                const registerLi = document.createElement('li');
                registerLi.innerHTML = '<a href="register.html" class="register-btn">Register</a>';
                navLinks.appendChild(registerLi);
            }
        }

        // Update Get Started button to point to login
        if (getStartedBtn) {
            getStartedBtn.href = 'login.html';
        }
    }
}

// Handle login form submission
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // For now, using localStorage for demo
        // In production, this would be replaced with actual API calls
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            // Store logged in user
            localStorage.setItem('user', JSON.stringify({
                username: user.username,
                isAdmin: user.isAdmin
            }));

            // Redirect to home page
            window.location.href = 'index.html';
        } else {
            alert('Invalid username or password');
        }
    });
}

// Handle registration form submission
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        // For now, using localStorage for demo
        // In production, this would be replaced with actual API calls
        const users = JSON.parse(localStorage.getItem('users') || '[]');

        if (users.some(u => u.username === username)) {
            alert('Username already exists');
            return;
        }

        // Add new user
        users.push({
            username,
            password,
            isAdmin: false,
            points: 0,
            rank: 'Bronze'
        });

        localStorage.setItem('users', JSON.stringify(users));

        // Auto login after registration
        localStorage.setItem('user', JSON.stringify({
            username,
            isAdmin: false
        }));

        // Redirect to home page
        window.location.href = 'index.html';
    });
}

// Initialize auth state
document.addEventListener('DOMContentLoaded', checkAuth); 