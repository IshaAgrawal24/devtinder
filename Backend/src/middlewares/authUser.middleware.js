const jwt = require("jsonwebtoken");

const Users = require("../models/user.model");

const authUser = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      status_code: 401,
      return_message: "User is not logged in!",
    });
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    const isUserExist = await Users.findById(decoded.id);

    if (!isUserExist) {
      return res.status(401).json({
        status_code: 401,
        return_message: "User is not logged in!",
      });
    }

    req.user = isUserExist;
    next();
  } catch (error) {
    return res.status(401).json({
      status_code: 401,
      return_message: "unauthorized",
    });
  }
};

module.exports = { authUser };
