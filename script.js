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

    // auto refreshes to remove sign out button
    location.reload();
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
                //alert("Login successful!");
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

    const userData = JSON.stringify({username, password});

    // sends data to the json file
    fetch('/save-account', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
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

function forgotPassword() {
    alert("That's too bad...");
}

function playGame() {
    alert("Starting the game...");
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

function setColors() {
    const primary = document.getElementById('color-primary').value;
    sessionStorage.setItem('color-primary', primary);

    const secondary = document.getElementById('color-secondary').value;
    sessionStorage.setItem('color-secondary', secondary);

    const tertiary = document.getElementById('color-tertiary').value;
    sessionStorage.setItem('color-tertiary', tertiary);

    document.body.style.backgroundImage = "linear-gradient(" + primary + ", " + secondary + ", " + tertiary + ")";
}

function colorDefault() {
    document.body.style.backgroundImage = "none";
    sessionStorage.setItem('color-primary', null);
}

function loadProfile() {
    if (sessionStorage.getItem('color-Primary') === null) {
        return;
    }

    const primary = sessionStorage.getItem('color-primary');
    const secondary = sessionStorage.getItem('color-secondary');
    const tertiary = sessionStorage.getItem('color-tertiary');

    document.body.style.backgroundImage = "linear-gradient(" + primary + ", " + secondary + ", " + tertiary + ")";
}

// Initialize stuff when the page loads
window.addEventListener("load", (event) => {
    initializeAuthButtons();
    //TODO: Make profile loading work.
    loadProfile();
});

document.body.innerHTML += `
<header>
    <div id="authButtonContainer">
        <button className="login-button" id="authButton" onClick="handleAuthButtonClick()">Login</button>
        <button className="login-button" id="signOutButton" onClick="signOut()">Sign Out</button>
    </div>
    <div class="profilePicture">
        
    </div>
</header>
`
