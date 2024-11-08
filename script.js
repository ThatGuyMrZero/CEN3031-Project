function initializeAuthButtons() {
    // depending on if person is logged in it will show differently
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
        const authButton = document.getElementById('authButton');
        authButton.innerText = 'Profile';
        document.getElementById('signOutButton').style.display = 'inline-block';
    }
}

function handleAuthButtonClick() {
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
        window.location.href = '/profile';
    } else {
        window.location.href = '/login';
    }
}

function signOut() {
    // storing things temporarily and this clears it
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('username');
    colorDefault();
    window.location.href = '/';
    // auto refreshes to remove sign out button
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const loginData = JSON.stringify({username, password});

    // sends info to check if user is in json
    fetch('/validate-login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
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

function newGame() {
    if ( !confirm("This will overwrite any unsaved progress. Are you sure?") ) {
        return;
    }
    window.location.href = '/game/1.html'
    sessionStorage.setItem('game-page', '1');
    //TODO: Start new profile
}

// TODO: Do game stuff
function playGame(add= 0) {
    let gamePage = sessionStorage.getItem('game-page');
    if (!gamePage) {
        gamePage = 1;
    }
    else {
        gamePage = Number(gamePage) + add;
    }
    sessionStorage.setItem('game-page', gamePage);
    window.location.href = '/game/' + gamePage + '.html';
}

// TODO: UNIMPLEMENTED
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
