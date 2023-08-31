function handleFormSign(event) {
    event.preventDefault();
    signIn();
}

function handleFormCreate(event) {
    event.preventDefault();
    createUser();
}

function handleFormUpdate(event) {
    event.preventDefault();
    updateInfo();
}

function handleFormOut(event) {
    event.preventDefault();
    logOut();
}

function handleGoToFormUpdate() {
    window.location.href = '/update';
}

function handleGoToFormOut() {
    logOut();
}

function handleGoToFormOption() {
    window.location.href = 'localhost:3000/';
    console.log("printing");
}

function signIn() {
    const logInForm = document.getElementById("logInForm");
    const formData = new FormData(logInForm);

    const username = formData.get("username");
    const password = formData.get("password");
    
    fetch(`/logIn?username=${username}&password=${password}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.success) {
            alert("User logged in!");
            console.log("user logged in");
            window.location.href = '/option';
        } else {
            alert("User log in failed.");
            console.log("smth went wrong");
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
    window.location.href = '/logIn';
}

function updateInfo() {
    const updateForm = document.getElementById("updateForm");
    const formData = new FormData(updateForm);

    const username = formData.get("username");
    const password = formData.get("password");
    const age = formData.get("age");
    const email = formData.get("email");
    const answer1 = formData.get("answer1");
    const answer2 = formData.get("answer2");
    const answer3 = formData.get("answer3");

    const userData = {
        username: username,
        password: password,
        age: age,
        email: email,
        answer1: answer1,
        answer2: answer2,
        answer3: answer3
    }

    fetch('/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("User updated!")
        } else {
            alert("User update failed.")
        }
    })
    .catch(error => {
        console.error("Error: ", error);
    });
}

function logOut() {
    fetch('/logOut', {
        method: 'POST'
    })
    .then(response => {
        if (response.status === 200) {
            alert("User logged out!");
            window.location.href = '/logIn';
        } else {
            alert("User log out failed.");
        }
    })
    .catch(error => {
        console.error("Error: ", error);
    })
}