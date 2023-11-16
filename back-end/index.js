// Server - running on Node.js

// import "dotenv/config";
const mongoose = require("mongoose");
const routes = require("./routes/router");
const googleTrends = require("./data/google");

routes.init();

mongoose.connect(
  "mongodb+srv://trend2023:enjoymylife0101@cluster0.mko4g5w.mongodb.net/trend",
  { useNewUrlParser: true }
);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "[trends server] MongoDB error:"));
db.once("open", () => {
  console.log("[trends server] Successfully connected to MongoDB!");
  googleTrends.getTrends();
});
