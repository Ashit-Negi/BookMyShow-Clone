const router = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");
const Show = require("../models/showModel");
const Theater = require("../models/theaterModel");

//add a show

router.post("/add-show", authMiddleware, async (req, res) => {
  try {
    const newShow = new Show(req.body);
    await newShow.save();
    res.send({
      success: true,
      message: "New show has been added!",
    });
    // console.log(req.body, res.success, res.message);
  } catch (err) {
    res.send({
      status: false,
      message: err.message,
    });
  }
});

// Delete a show

router.post("/delete-show", authMiddleware, async (req, res) => {
  try {
    await Show.findByIdAndDelete(req.body.showId);
    res.send({
      success: true,
      message: "The show has been deleted!",
    });
  } catch (err) {
    res.send({
      status: false,
      message: err.message,
    });
  }
});

// Update a show

router.put("/update-show", authMiddleware, async (req, res) => {
  try {
    await Show.findByIdAndUpdate(req.body.showId, req.body);
    res.send({
      success: true,
      message: "The show has been updated!",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

// get shows by movie
router.post("/get-all-theaters-by-movie", authMiddleware, async (req, res) => {
  try {
    const { movie, date } = req.body;

    const newShows = await Show.find({ movie, date }).populate("theater");

    let uniqueTheaters = [];

    newShows.forEach((show) => {
      let isTheater = uniqueTheaters.find(
        (theater) => theater._id === show.theater._id
      );
      if (!isTheater) {
        let showsOfThisTheater = newShows.filter(
          (showObj) => showObj.theater._id == show.theater._id
        );
        uniqueTheaters.push({
          ...show.theater._doc,
          newShows: showsOfThisTheater,
        });
      }
    });
    res.send({
      success: true,
      message: "All theater fetched!",
      data: uniqueTheaters,
    });
    // console.log(uniqueTheaters);
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// Get shows by theaters

router.post("/get-all-shows-by-theater", authMiddleware, async (req, res) => {
  try {
    const shows = await Show.find({ theater: req.body.theaterId }).populate(
      "movie"
    );
    res.send({
      success: true,
      message: "All shows fetched",
      data: shows,
    });
    console.log(req.body, res.data, shows);
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});
// new
router.post("/get-show-by-id", authMiddleware, async (req, res) => {
  try {
    const show = await Show.findById(req.body.showId)
      .populate("movie")
      .populate("theater");
    res.send({
      success: true,
      message: "Show fetched!",
      data: show,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
