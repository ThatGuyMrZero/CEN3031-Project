function initializeAuthButtons() {
    // depending on if person is logged in it will show differently
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
        const authButton = document.getElementById('authButton');
        authButton.innerText = 'Profile';
        authButton.onclick = () => alert("Profile page coming soon!"); // Placeholder for profile page

        document.getElementById('signOutButton').style.display = 'inline-block';
    }
}

// TODO: UNIMPLEMENTED
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

// TODO: Ensure that the user cannot enter blank fields for username and password
function createAccount() {
    const username = document.getElementById('newUsername').value;
    const password = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }
    else if (username === "" || password === "") {
        alert("Username or password is required!");
        return;
    }
    else if (password.length < 8) {
        alert("Password must be at least 8 characters long!");
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

function updatePassword() {
    const username = document.getElementById('confirmUsername').value;
    const password = document.getElementById('enterNewPassword').value;
    const confirmPassword = document.getElementById('confirmNewPassword').value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }
    else if (password.length < 8) {
        alert("Password must be at least 8 characters long!");
        return;
    }

    const userData = JSON.stringify({ username, password });

    fetch('/update-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: userData
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Password updated successfully!");
                sessionStorage.setItem('username', username);
                sessionStorage.setItem('password', password);
                window.location.href = '/';
            } else {
                alert("Error updating password.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred.");
        });
}
// TODO: Do game stuff
function playGame() {
    alert("Starting the game...");
    // Implement the play game functionality here
}

// TODO: UNIMPLEMENTED
function showOptions() {
    alert("Opening options...");
    window.location.href='/options';
}

function changeBackgroundColor(color) {
    document.body.style.backgroundColor = color;
    localStorage.setItem('backgroundColor', color);
}

function loadSavedColor(color) {
    const savedColor = localStorage.getItem('backgroundColor');
    if (savedColor) {
        document.body.style.backgroundColor = savedColor;
    }
}

function exitGame() {
    alert("Exiting the game, thanks for playing! You may now close this window at any time.");
    // TODO: Make sure the window can close when the user has switched to another page previously
    window.close();
    // Implement the exit functionality here
}

// Initialize the authentication buttons when the page loads
window.onload = initializeAuthButtons;