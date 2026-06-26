const validator = require('validator');

const validateSignUpData = (req) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName) {
        return "Name is not valid."
    } else if (!validator.isEmail(email))
        return "Email is not valid."
    else if (!validator.isStrongPassword(password))
        return "Password is not strong enough."
}

module.exports = {validateSignUpData}