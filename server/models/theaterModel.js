const mongoose = require("mongoose");

const theaterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },

  isActive: {
    type: Boolean,
    default: false,
  },
});

const Theater = mongoose.model("theater", theaterSchema);

module.exports = Theater;
