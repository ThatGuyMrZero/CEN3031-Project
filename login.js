

// Test
// test again

let login_form = document.getElementById("login");
login_form.addEventListener('submit', Login);

function Login(event) {
    event.preventDefault();

    const button = document.querySelector("#login_submit");
    const login_data = new FormData(event.target, button);

    //login_data.keys().forEach( (x) => {console.log(x)} );
    //console.log(login_data['user']);
    //console.log(login_data.get('user'));

    let new_div = document.body.createElement('div');
    new_div.style = "border: 2px black dotted";
    document.body.append(new_div);
    new_div.innerText = login_data.get('user');

    //document.body.innerHTML += login_data.get('user');
}
