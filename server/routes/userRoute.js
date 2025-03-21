const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

//Route for register
router.post("/register", async (req, res) => {
  try {
    const userExist = await User.findOne({ email: req.body.email });
    if (!userExist) {
      res.send({
        success: true,
        message: "user already Exists",
      });
    }
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

module.exports = router;
