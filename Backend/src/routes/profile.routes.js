const express = require("express");

const profileController = require('../controllers/profile.controller');
const userMiddleware = require('../middlewares/authUser.middleware');

const router = express.Router();

router.get("/view", userMiddleware.authUser, profileController.viewProfile)

module.exports = router;