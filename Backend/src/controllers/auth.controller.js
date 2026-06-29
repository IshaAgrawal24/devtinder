const bcrypt = require('bcrypt');

const { validateSignUpData, validateLoginData } = require("../utils/validation");

const userModel = require('../models/user.model');

const signup = async (req, res) => {
    try {
        const { email, firstName, lastName, password } = req.body;
        const isValidationMessage = await validateSignUpData(req);

        if (isValidationMessage)
            return res.status(400).json({
                status_code: 400,
                error: {
                    error_message: isValidationMessage
                }
            })

        const isUserAlreadyExist = await userModel.findOne({
            email
        })

        if (isUserAlreadyExist) {
            return res.status(409).json({
                status_code: 409,
                error: {
                    error_message: "User has already exist."
                }
            })
        }

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const newUser = await userModel.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: passwordHash
        })

        const token = await newUser.getJWT()

        res.cookie("Token", token)

        res.status(201).json({
            status_code: 201,
            success: true,
            message: "User created successfully,",
            data: {
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
            }
        })
    } catch (error) {
        console.log("Auth controller error:", error);
        return res.status(500).json({
            return_message: "Internal Server Error",
        });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const isValidationMessage = await validateLoginData(req);
        if (isValidationMessage) {
            return res.status(400).json({
                status_code: 400,
                error: {
                    error_message: isValidationMessage
                }
            })
        }

        const userData = await userModel.findOne({ email });
        if (!userData) {
            return res.status(401).json({
                status: false,
                status_code: 401,
                return_message: "Invalid Credentials",
            });

        }

        const isPasswordMatch = await bcrypt.compare(password, userData.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                status: false,
                status_code: 401,
                return_message: "Invalid Credentials",
            });

        }

        const token = await userData.getJWT();
        res.cookie("Token", token, {
            expires: new Date(Date.now() + 8 * 3600000)
        })

        res.status(201).json({
            status: true,
            return_message: "User logged in successfully.",
            user: userData
        })

    } catch (error) {
        console.log("Login Controller Error:", error);
        return res.status(500).json({
            status: false,
            status_code: 500,
            return_message: "Internal Server Error",
        });
    }
}

const logout = async (req, res) => {

}

module.exports = { signup, login, logout }