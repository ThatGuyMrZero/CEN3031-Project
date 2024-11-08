function initializeAuthButtons() {
    // depending if person is logged in it will show differently
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
        const authButton = document.getElementById('authButton');
        authButton.innerText = 'Profile';
        authButton.onclick = () => alert("Profile page coming soon!"); // Placeholder for profile page

        document.getElementById('signOutButton').style.display = 'inline-block';
    }
}

function handleAuthButtonClick() {
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
        alert("Profile page coming soon!");
    } else {
        window.location.href = '/login';
    }
}

function signOut() {
    // storing things temporarily and this clears it
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('username');

    // auto refreshes to remove sign out button
    location.reload();
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const loginData = JSON.stringify({ username, password });

    // sends info to check if user is in json
    fetch('/validate-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: loginData
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Login successful!");
                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('username', username);
                // redirect to main menu
                window.location.href = '/';
            } else {
                alert("Invalid username or password.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred.");
        });
}

function createAccount() {
    const username = document.getElementById('newUsername').value;
    const password = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    const userData = JSON.stringify({ username, password });

    // sends data to the json file
    fetch('/save-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: userData
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Account created successfully!");
                window.location.href = '/';
            } else {
                alert("Error creating account.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred.");
        });
}

function playGame() {
    let username = document.getElementById('username').value;
    alert("Starting the game... " + username);
    // Implement the play game functionality here
}

function showOptions() {
    alert("Opening options...");
    // Implement the options functionality here
}

function exitGame() {
    alert("Exiting the game...");
    // Implement the exit functionality here
}

// Initialize the authentication buttons when the page loads
window.onload = initializeAuthButtons;
