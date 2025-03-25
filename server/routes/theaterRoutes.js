const router = require("express").Router();
const theater = require("../models/theaterModel");

// add a theater
router.post("/add-theater", async (req, res) => {
  try {
    const newTheater = new theater(req.body);
    await newTheater.save();
    res.send({
      success: true,
      message: "New theater has been added!",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

router.post("/udate-theater", async (req, res) => {
  try {
    await theater.findById(req.body.theatreId, req.body); // to find id in database and add in req body to update
    res.send({
      success: true,
      message: "Theater has been updated",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});
router.delete("/delete-theater", async (req, res) => {
  try {
    await theater.findById(req.body.theatreId); //find id form database to delete
    res.send({
      success: true,
      message: "Theater has been deleted",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
