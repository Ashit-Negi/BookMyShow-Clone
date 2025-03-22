require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoute");

const app = express();
mongoose
  .connect(
    "mongodb+srv://sashitnegi:9pdsgS0yh1fbT1wJ@cluster0.u6ypk.mongodb.net/BMS?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("DB is connected"))
  .catch((err) => {
    console.log(err);
  });

const PORT = 5003;
//middleware
app.use(express.json());
app.use(express.urlencoded());

app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log("Server Started");
});

// 9pdsgS0yh1fbT1wJ what is nvc architechure
