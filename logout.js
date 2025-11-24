// logout.js – handles the logout button in the navigation bar
// This script is loaded after router.js in index.html

document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Clear any stored login state
            localStorage.setItem('loggedIn', 'false');
            localStorage.removeItem('userEmail');
            // If the API client provides a logout endpoint, call it
            if (window.api && typeof window.api.logout === 'function') {
                window.api.logout();
            }
            // Redirect to the login screen via hash change
            location.hash = '#login';
        });
    }
});

// Expose a global helper (optional) for manual logout calls
window.performLogout = () => {
    const event = new Event('click');
    logoutBtn?.dispatchEvent(event);
};
