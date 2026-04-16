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
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: usernameInput, password: passwordInput })
        });

        const data = await response.json();

        if (response.ok) {
            // Save advanced tokens & role
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            localStorage.setItem('role', data.role);
            
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

// --- 2. Advanced Dashboard Transition & Data Fetching ---
async function transitionToDashboard() {
    let accessToken = localStorage.getItem('accessToken');
    if (!accessToken) return;

    // Change UI state
    loginView.style.display = 'none';
    dashboardView.style.display = 'block';
    
    // Dim the background to emphasize the glowing screen
    document.body.style.backgroundColor = '#18191c'; 

    try {
        // Fetch the secure data using our token from the new endpoint
        let response = await fetch('/api/secure/dashboard', {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + accessToken }
        });

        // --- AUTOMATIC TOKEN REFRESH LOGIC ---
        // If the access token is expired (401), try to use the refresh token
        if (response.status === 401) {
            const refreshSuccess = await attemptTokenRefresh();
            if (refreshSuccess) {
                // If refresh worked, try the secure data fetch one more time with the new token
                accessToken = localStorage.getItem('accessToken');
                response = await fetch('/api/secure/dashboard', {
                    method: 'GET',
                    headers: { 'Authorization': 'Bearer ' + accessToken }
                });
            }
        }

        const data = await response.json();

        if (response.ok) {
            // Populate the skeuomorphic CRT screen
            document.getElementById('dashUser').innerText = data.user;
            document.getElementById('dashStatus').innerText = data.status;
            
            // Updating the uplink field to show the new Role Clearance
            document.getElementById('dashUplink').innerText = `Clearance: ${data.clearance}`; 
            
            // Re-adding mock data for the other fields to keep the UI looking full
            document.getElementById('dashNodes').innerText = "42";
            document.getElementById('dashCpu').innerText = "14.2%";
            
        } else if (response.status === 403) {
            // Handles the RBAC (Role-Based Access Control) denial if user is not ADMIN
            document.getElementById('dashStatus').innerText = "INSUFFICIENT CLEARANCE";
            document.getElementById('dashStatus').style.color = "#ff4949";
            document.getElementById('dashUplink').innerText = data.error;
            document.getElementById('dashNodes').innerText = "ERR";
            document.getElementById('dashCpu').innerText = "ERR";
        } else {
            // If tokens are totally invalid
            handleLogout();
            alert("Session expired. Please log in again.");
        }
    } catch (error) {
        document.getElementById('dashStatus').innerText = "CONNECTION LOST";
        document.getElementById('dashStatus').style.color = "#ff4949";
    }
}

// --- 3. Refresh Token Helper ---
async function attemptTokenRefresh() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return false;

    try {
        const response = await fetch('/api/auth/refresh', {
            method: 'POST',
            headers: { 'Refresh-Token': refreshToken }
        });

        if (response.ok) {
            const data = await response.json();
            // Save the brand new access token
            localStorage.setItem('accessToken', data.accessToken);
            return true;
        }
    } catch (error) {
        console.error('Failed to refresh token', error);
    }
    return false;
}

// --- 4. Logout Handling ---
function handleLogout() {
    // Destroy all cryptographic tokens and roles
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('role');
    
    // Clear inputs and messages
    document.getElementById('password').value = '';
    messageBox.style.display = 'none';

    // Switch views back to login
    dashboardView.style.display = 'none';
    loginView.style.display = 'block';
    
    // Restore the background color
    document.body.style.backgroundColor = 'var(--bg-color)'; 
}

// Attach logout event
document.getElementById('logoutBtn').addEventListener('click', handleLogout);

// --- 5. Auto-Login Check ---
// If the user refreshes the page and already has a token, go straight to dashboard
if (localStorage.getItem('accessToken')) {
    transitionToDashboard();
}