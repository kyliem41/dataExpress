const passwordUtil = require('../security/password');

module.exports = class User {
    constructor(username, password, email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }

    createUser() {
        console.log("acces granted");
    }
}

const CreateUser = (username, password, email) => {
    //validate user fields
    //salt and hash pass - security dir
    let hashedPass = passwordUtil.hashPass(password);
    let hashedAgain = passwordUtil.hashPass(password);
    let isValidPass = passwordUtil.comparePass(password, hashedAgain);

    let user = new User(username, hashedPass, email);
    //call DAL to persist user

}

const GetUser = () => {

}

const UpdateUser = () => {

}

module.exports = {
    CreateUser, 
    GetUser,
    UpdateUser
}