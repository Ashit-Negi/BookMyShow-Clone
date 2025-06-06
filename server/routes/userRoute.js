const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");
// const authMiddleware = require("../middleware/authMiddleware");

//Route for register
router.post("/register", async (req, res) => {
  try {
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      return res.send({
        success: false,
        message: "user already Exists",
      });
    }

    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt); //this will hash the password
    req.body.password = hashedPassword; //this will save the password to the body

    const newUser = await User(req.body);
    await newUser.save(); // this is to save in the database

    res.send({
      success: true,
      message: "User Registered Successfully",
    });
  } catch (error) {
    console.log(error);
  }
});

//login route
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.send({
        success: false,
        message: "You are not registered Please Register First",
      });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    ); //this is to compare password form the user and the db password
    if (!validPassword) {
      return res.send({
        success: false,
        message: "Sorry, invalid password entered!",
      });
    }
    const token = jwt.sign({ userId: user._id }, `${process.env.SECRET_KEY}`, {
      expiresIn: "1D",
    });

    res.send({
      success: true,
      message: "User Logged in",
      token: token, //this is jwt token
      user: user,
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/get-current-user", authMiddleware, async (req, res) => {
  const user = await User.findById(req.body.userId).select("-password");
  // console.log(user);

  res.send({
    success: true,
    message: "User Authoried for Protected Route",
    data: user,
  });
});

module.exports = router;
