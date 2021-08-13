const router = require("express").Router();
const { UniqueConstraintError } = require("sequelize");
const { userModel } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//! Register

router.post("/register", async (req, res) => {
  let { firstName, lastName, email, password, isAdmin } = req.body;
  let template = {
    firstName,
    lastName,
    email,
    password: bcrypt.hashSync(password, 12),
    isAdmin,
  };
  try {
    let NewUser = await userModel.create(template);
    let token = jwt.sign({ id: NewUser.id }, process.env.JWT_SECRET, {
      expiresIn: 60 * 60 * 24,
    });
    res.status(201).json({
      message: "user successfully registered",
      token,
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
    let loginUser = await userModel.findOne(query);
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
          message: `${loginUser.firstName} successfully logged in!`,
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

module.exports = router;
