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
    else if (username === "" || password === "") {
        alert("Username or password is required!");
        return;
    }
    else if (password.length < 6) {
        alert("Password must be at least 6 characters long!");
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
    else if (password.length < 6) {
        alert("Password must be at least 6 characters long!");
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
    window.location.href = '/game/0.html'
    sessionStorage.setItem('game-page', '0');
    //TODO: Start new profile
}

// TODO: Do game stuff
function playGame(add= 0) {
    let gamePage = sessionStorage.getItem('game-page');
    if (!gamePage) {
        gamePage = 0;
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
    alert("Exiting the game, thanks for playing! You may now close this window at any time.");
    // TODO: Make sure the window can close when the user has switched to another page previously
    window.close();
    // Implement the exit functionality here
}

function colorDefault() {

    document.body.style.backgroundImage = "none";
    sessionStorage.setItem('default', 'true');

    sessionStorage.setItem('color-primary', '#808890')
    sessionStorage.setItem('color-secondary', '#908880')
    sessionStorage.setItem('color-tertiary', '#38a050')

    sessionStorage.setItem('width-primary', 0);
    sessionStorage.setItem('width-secondary', 50);
    sessionStorage.setItem('width-tertiary', 100);

    sessionStorage.setItem('angle', '180');

    sessionStorage.setItem('background-type', 'solid');

    location.reload();
}

function loadProfile() {

    const defaultFlag = sessionStorage.getItem('default');
    // Do nothing if default settings flag is set.
    if ( defaultFlag === 'true' ) {
        return;
    }
    // If fresh logon, set defaults.
    else if ( defaultFlag === null ) {
        colorDefault();
        return;
    }

    // Get relevant session variables.
    let primary = sessionStorage.getItem('color-primary');
    let secondary = sessionStorage.getItem('color-secondary');
    let tertiary = sessionStorage.getItem('color-tertiary');

    let widthPrimary = sessionStorage.getItem('width-primary');
    let widthSecondary = sessionStorage.getItem('width-secondary');
    let widthTertiary = sessionStorage.getItem('width-tertiary');

    let angle = sessionStorage.getItem('angle');

    let type = sessionStorage.getItem('background-type');

    // For each type of background, set it using the variables.
    if ( type === 'solid' ) {

        document.body.style.backgroundColor = primary;
        document.body.style.backgroundImage = 'none';
    }
    else if ( type === 'linear-gradient') {

        document.body.style.backgroundImage = "linear-gradient(" + angle + "deg, " + primary + " " +
            widthPrimary + "%, " + secondary + " " + widthSecondary + "%, " + tertiary + " " + widthTertiary + "%)";
    }
    else if ( type === 'radial-gradient') {

        document.body.style.backgroundImage = "radial-gradient(" + primary + " " +
            widthPrimary + "%, " + secondary + " " + widthSecondary + "%, " + tertiary + " " + widthTertiary + "%)";
    }
    else if ( type === 'repeating-linear-gradient') {

        document.body.style.backgroundImage = "repeating-linear-gradient(" + angle + "deg, " + primary + " " +
            widthPrimary + "%, " + secondary + " " + widthSecondary + "%, " + tertiary + " " + widthTertiary + "%)";
    }
}

// Initialize profile picture on page load
function loadProfilePicture() {
    const savedPicture = sessionStorage.getItem('profile-picture');
    if (savedPicture) {
        const profileImageElement = document.querySelector('.profileImage');
        if (profileImageElement) {
            profileImageElement.src = savedPicture;
        }
    }
}

// Initialize stuff when the page loads
window.addEventListener("load", () => {
    initializeAuthButtons();
    loadProfile();
    loadProfilePicture();
});

document.body.innerHTML += `
<header>
    <div id="authButtonContainer">
        <button class="login-button" id="authButton" onClick="handleAuthButtonClick()">Login</button>
        <button class="login-button" id="signOutButton" onClick="signOut()">Sign Out</button>
    </div>
    <div class="profilePicture">
        <img class="profileImage" src='/media/profile-pictures/tobias-funke.png' alt="Profile picture."/>
    </div>
</header>
`
