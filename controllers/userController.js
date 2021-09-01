const router = require("express").Router();
const { UniqueConstraintError } = require("sequelize");
const { UserModel } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { CheckAdmin } = require("../middleware");
const checkAdmin = require("../middleware/checkAdmin");
const {validateSession} = require("../middleware")

//! Register

router.post("/register", async (req, res) => {
  let { pic, firstName, lastName, email, password, isAdmin, isBanned } = req.body;
  let template = {
    pic,
    firstName,
    lastName,
    email,
    password: bcrypt.hashSync(password, 12),
    isAdmin,
    isBanned,
  };
  try {
    let NewUser = await UserModel.create(template);
    let token = jwt.sign({ id: NewUser.id }, process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 24,
    });
    res.status(201).json({
      message: "user successfully registered",
      token,
      userInfo: NewUser
    });
  } catch (err) {
    if (err instanceof UniqueConstraintError && isAdmin == false) {
      res.status(409).json({
        message: "Email already in use",
      });
    } else if (err instanceof UniqueConstraintError) {
      res.status(409).json({
        message: "There can only be one admin",
      });
    } else {
      res.status(500).json({
        message: `Failed to register user: ${err}`,
      });
    }
  }
});

//! Login

router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let query = {
    where: {
      email: email,
    },
  };

  try {
    let loginUser = await UserModel.findOne(query);
    if (loginUser) {
      let passwordComparison = await bcrypt.compare(
        password,
        loginUser.password
      );

      if (passwordComparison) {
        let token = jwt.sign({ id: loginUser.id }, process.env.JWT_SECRET, {
          expiresIn: 60 * 60 * 24,
        });

        res.status(200).json({
          message: `user successfully logged in!`,
          userInfo: loginUser,
          token,
        });
      } else {
        res.status(401).json({
          message: "Incorrect email or password",
        });
      }
    } else {
      res.status(401).json({
        message: "Incorrect email or password",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Failed to log user in",
    });
  }
});

//! Ban user
router.put("/ban/:userId",validateSession, checkAdmin, async (req, res) => {
  const {userId} = req.params;
  const {id} = req.user
  const { isBanned } = req.body;

  const template = {
    isBanned,
  };

  const query = {
    where: {
      id: userId
    }
  };

  try {
    if (id == userId) {
      res.status(406).json({
        message: "You can't ban yourself",
      });
    } else {
      bannedUser = await UserModel.update(template, query);
      res.status(200).json({
        message: `User is now banned`,
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
});

module.exports = router;
