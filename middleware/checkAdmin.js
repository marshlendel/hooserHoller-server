const jwt = require("jsonwebtoken");
const { UserModel } = require("../models");

const checkAdmin = async (req, res, next) => {
  const { authorization } = req.headers;
  const payload = authorization
    ? jwt.verify(authorization, process.env.JWT_SECRET)
    : undefined;

  let foundUser = await UserModel.findOne({ where: { id: payload.id } });

  if (foundUser.isAdmin) {
    next();
  } else {
    res.status(400).json({
      message: "You aren't an authorized admin!",
    });
  }
};

module.exports = checkAdmin