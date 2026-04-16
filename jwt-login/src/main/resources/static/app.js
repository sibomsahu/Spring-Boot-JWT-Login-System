// --- DOM Elements ---
const loginView = document.getElementById('loginView');
const dashboardView = document.getElementById('dashboardView');
const messageBox = document.getElementById('message');

// --- 1. Login Handling ---
document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: usernameInput, password: passwordInput })
        });

        const data = await response.json();

        if (response.ok) {
            // Save token
            localStorage.setItem('jwtToken', data.token);
            // Switch views
            transitionToDashboard();
        } else {
            messageBox.style.display = 'block';
            messageBox.className = 'error';
            messageBox.innerText = 'ACCESS DENIED: ' + data.error;
        }
    } catch (error) {
        messageBox.style.display = 'block';
        messageBox.className = 'error';
        messageBox.innerText = 'CONNECTION FAILED.';
    }
});

// --- 2. Dashboard Transition & Data Fetching ---
async function transitionToDashboard() {
    const token = localStorage.getItem('jwtToken');
    if (!token) return;

    // Change UI state
    loginView.style.display = 'none';
    dashboardView.style.display = 'block';
    
    // Dim the background to emphasize the glowing screen
    document.body.style.backgroundColor = '#18191c'; 

    try {
        // Fetch the secure data using our token
        const response = await fetch('/api/secure-data', {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        });

        const data = await response.json();

        if (response.ok) {
            // Populate the skeuomorphic CRT screen
            document.getElementById('dashUser').innerText = data.user;
            document.getElementById('dashStatus').innerText = data.status;
            document.getElementById('dashUplink').innerText = data.uplink;
            document.getElementById('dashNodes').innerText = data.activeNodes;
            document.getElementById('dashCpu').innerText = data.cpuLoad;
        } else {
            // If token is invalid/expired while trying to load dashboard
            handleLogout();
            alert("Session expired. Please log in again.");
        }
    } catch (error) {
        document.getElementById('dashStatus').innerText = "CONNECTION LOST";
        document.getElementById('dashStatus').style.color = "#ff4949";
    }
}

// --- 3. Logout Handling ---
function handleLogout() {
    // Destroy the cryptographic token
    localStorage.removeItem('jwtToken');
    
    // Clear inputs and messages
    document.getElementById('password').value = '';
    messageBox.style.display = 'none';

    // Switch views back to login
    dashboardView.style.display = 'none';
    loginView.style.display = 'block';
    
    // Restore the Neobrutalist background color
    document.body.style.backgroundColor = 'var(--bg-color)'; 
}

// Attach logout event
document.getElementById('logoutBtn').addEventListener('click', handleLogout);

// --- 4. Auto-Login Check ---
// If the user refreshes the page and already has a token, go straight to dashboard
if (localStorage.getItem('jwtToken')) {
    transitionToDashboard();
}