const bcrypt = require('bcryptjs');

const hashPass = (password) => {
    let salt = bcrypt.genSaltSync();
    let hash = bcrypt.hashSync(password, salt);
    return hash;
}

const comparePass = (pass1, pass2) => {
    let isValid = bcrypt.compareSync(pass1, pass2);
    return isValid;
}

module.exports = {
    hashPass,
    comparePass
}