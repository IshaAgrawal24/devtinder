const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowerCase: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error(`Invalid Email Address: ${value}`)
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error(`Enter a strong password: ${value}`)
            }
        }
    },
    gender: {
        type: String,
        enum: {
            values: ["male", "female", "others"]
        }
    },
    age: {
        type: Number,
        min: 18
    },
    isPremium: {
        type: Boolean,
        default: false
    }
})

userSchema.methods.getJWT = async function () {
    const userModel = this;

    const token = await jwt.sign({
        id: userModel._id
    }, process.env.JWT_SECRET)

    return token;
}

const userModel = mongoose.model("Users", userSchema)
module.exports = userModel;