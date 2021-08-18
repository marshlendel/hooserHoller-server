const jwt = require("jsonwebtoken");
const { UserModel } = require("../models");

const checkBanned = async (req, res, next) => {
  const { authorization } = req.headers;
  const payload = authorization
    ? jwt.verify(authorization, process.env.JWT_SECRET)
    : undefined;

  let foundUser = await UserModel.findOne({ where: { id: payload.id } });

  if (foundUser.isBanned) {
    res.status(400).json({
      message: "You're banned bro",
    });
  } else {
    next();
  }
};

module.exports = checkBanned;
