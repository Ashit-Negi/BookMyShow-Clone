const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    let token = req.headers.authorization.split(" ")[1];
    let verifiedToken = jwt.verify(token, `${process.env.SECRET_KEY}`);
    console.log(verifiedToken);
    req.body.userId = verifiedToken.userId; // this to take out the user id to send in forntend
    next();
  } catch (error) {
    res.send({
      success: false,
      message: "Invalid token",
    });
  }
};
