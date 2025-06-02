require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // added

const userRoutes = require("./routes/userRoute");
const theaterRoutes = require("./routes/theaterRoutes");
const movieRoutes = require("./routes/movieRoutes");
const showRoutes = require("./routes/showRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Setup CORS - replace with your frontend URL
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGOOSE_KEY)
  .then(() => console.log("DB is connected"))
  .catch((err) => {
    console.error("DB connection error:", err);
  });

const PORT = process.env.PORT || 5003;

// API routes
app.use("/api/users", userRoutes);
app.use("/api/theaters", theaterRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/shows", showRoutes);
app.use("/api/bookings", bookingRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
