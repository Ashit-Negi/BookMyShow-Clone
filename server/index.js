require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoute");
const theaterRoutes = require("./routes/theaterRoutes");
const movieRoutes = require("./routes/movieRoutes");
const showRoutes = require("./routes/showRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();
mongoose
  .connect(process.env.MONGOOSE_KEY)
  .then(() => console.log("DB is connected"))
  .catch((err) => {
    console.log(err);
  });

const PORT = 5003;
//middleware
app.use(express.json());
app.use(express.urlencoded());

app.use("/api/users", userRoutes);
app.use("/api/theaters", theaterRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/shows", showRoutes);
app.use("/api/bookings", bookingRoutes);

app.listen(PORT, () => {
  console.log("Server Started");
});

// 9pdsgS0yh1fbT1wJ what is nvc architechure
