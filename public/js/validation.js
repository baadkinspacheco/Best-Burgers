
const userValidation = data => {
    // If username is invalid return false
    if (!validUsername(data.username)) {
        return false;
    }
    // If the password is invalid return false
    if (!validPassword(data.password)) {
        return false;
    }
    return true;
};

// If the username is invalid return false
function validUsername(username) {
     if (username.length < 6) {
        return false;
    }
    if (username.length > 225) {
        return false;
    }
    return true;
}

// If the password is invalid return false
function validPassword(password) {
    if (password.length < 8) {
        return false;
    }
    if (password.length > 225) {
        return false;
    }
    var numbers = /[0-9]/g;
    if (!password.match(numbers)) {
        return false;
    }
    var lowerCaseLetters = /[a-z]/g;
    if (!password.match(lowerCaseLetters)) {
        return false;
    }
    var upperCaseLetters = /[A-Z]/g;
    if (!password.match(upperCaseLetters)) {
        return false;
    }
    return true;
}

module.exports.userValidation = userValidation;