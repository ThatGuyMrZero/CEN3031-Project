let login_form = document.getElementById("login");
login_form.addEventListener('submit', Login);

function Login(event) {
    event.preventDefault();

    const button = document.querySelector("#login_submit");
    const login_data = new FormData(event.target, button);

    let new_div = document.body.createElement('div');
    new_div.style = "border: 2px black dotted";
    document.body.append(new_div);
    new_div.innerText = login_data.get('user');

}
