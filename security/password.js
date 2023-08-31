const bcrypt = require('bcryptjs');

async function hashPass(password) {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    return hash;
}

async function comparePass(pass1, pass2) {
    let isValid = bcrypt.compareSync(pass1, pass2);
    return isValid;
}

module.exports = {
    hashPass,
    comparePass
}