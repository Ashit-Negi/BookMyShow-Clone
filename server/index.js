require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const userRoutes = require("./routes/userRoute");
const theaterRoutes = require("./routes/theaterRoutes");
const movieRoutes = require("./routes/movieRoutes");
const showRoutes = require("./routes/showRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

app.use(express.json());

// Agar frontend React app kisi URL pe deployed hai to uska URL dalna better hai, ya cors() ko configure karna
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

// React frontend ko serve karne ke liye static files ka path set karo
app.use(express.static(path.join(__dirname, "client", "build")));

// Ye route tab chalta hai jab koi frontend ke alawa URL pe request aati hai
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
