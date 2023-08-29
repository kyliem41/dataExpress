function handleFormSign(event) {
    event.preventDefault();
    signIn();
}

function handleFormCreate(event) {
    event.preventDefault();
    createUser();
}

function signIn() {
    const logInForm = document.getElementById("logInForm");
    const formData = new FormData(logInForm);

    const username = formData.get("username");
    const password = formData.get("password");

    // const hashedPass = bcrypt.hash(password, 10);

    // const userData = {
    //     username: username,
    //     password: password
    // }

    fetch(`/logIn?username=${username}&password=${password}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("User logged in!")
            updateInfo();
        } else {
            alert("User log in failed.")
        }
    })
    .catch(error => {
        console.error("Error: ", error);
    });
}

function createUser() {
    const signUpForm = document.getElementById("signUpForm");
    const formData = new FormData(signUpForm);

    const username = formData.get("username");
    const password = formData.get("password");
    const age = formData.get("age");
    const email = formData.get("email");
    const answer1 = formData.get("answer1");
    const answer2 = formData.get("answer2");
    const answer3 = formData.get("answer3");

    //const hashedPass = bcrypt.hash(password, 10);

    const userData = {
        username: username,
        password: password,
        age: age,
        email: email,
        answer1: answer1,
        answer2: answer2,
        answer3: answer3
    }

    fetch('/signUp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("User created!")
        } else {
            alert("User creation failed.")
        }
    })
    .catch(error => {
        console.error("Error: ", error);
    });
}

function updateInfo() {

}