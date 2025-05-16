const router = require("express").Router();
const theater = require("../models/theaterModel");

// add a theater
router.post("/add-theater", async (req, res) => {
  try {
    const newtheater = new theater(req.body);
    await newtheater.save();
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

router.put("/update-theater", async (req, res) => {
  try {
    await theater.findByIdAndUpdate(req.body.theaterId, req.body); // to find id in database and add in req body to update
    res.send({
      success: true,
      message: "theater has been updated",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});
router.put("/delete-theater", async (req, res) => {
  try {
    await theater.findByIdAndDelete(req.body.theaterId); //find id form database to delete
    res.send({
      success: true,
      message: "theater has been deleted",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// this if for get all the theraters for admin route
router.get("/get-all-theaters", async (req, res) => {
  try {
    const alltheaters = await theater.find().populate("owner"); //this populate is for to get the theater owner
    res.send({
      success: true,
      message: "All theaters fetched",
      data: alltheaters,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// post the theaters of a specific owner
router.post("/get-all-theaters-by-owner", async (req, res) => {
  try {
    const alltheaters = await theater.find({ owner: req.body.owner });
    res.send({
      success: true,
      message: "All theaters fetched successfully",
      data: alltheaters,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
