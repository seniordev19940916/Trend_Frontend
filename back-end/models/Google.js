// Mongoose model for Google Trends
const mongoose = require("mongoose");

const googleSchema = new mongoose.Schema(
  {
    name: String,
    location: String,
    searches: Number,
    url: String,
    image: String,
    date: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("google_trends", googleSchema);
