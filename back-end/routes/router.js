// Server - running on Node.js

const express = require("express");
const locations = require("../config/locations");
const googleModel = require("../models/Google");

const app = express();
const router = express.Router();
const port = 3001;

const routes = {
  init: () => {
    console.log(`[trends server] Initializing server...`);
    router.all("/*", function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      next();
    });
    router.get("/", (req, res) => {
      res.json({ success: false, error: "No endpoint provided!" });
    });
    router.get("/locations", (req, res) => {
      res.json({ success: true, data: locations });
    });
    routes.createEndpoints(
      "google_trends",
      googleModel,
      locations
        .filter((location) => location.location !== "Worldwide")
        .map((location) => location.location)
    );
  },
  createEndpoints: (platform, model, platformLocations) => {
    router.get(`/${platform}`, (req, res) => {
      res.json({ success: false, error: "No location provided!" });
    });
    platformLocations.forEach((location) => {
      const endpoint = `/${platform}/${location.toLowerCase()}`;
      console.log(
        `[trends server] Routing a new enpoint to /api${endpoint}...`
      );
      router.get(endpoint, (req, res) => {
        model.find({ location: location }, (error, model) => {
          if (error) return res.json({ success: false, error: error });
          return res.json({ success: true, data: model });
        });
      });
    });
  },
};

app.use("/api", router);
app.listen(port, () =>
  console.log(
    `[trends server] Server is running and listening to port ${port}...`
  )
);

module.exports = routes;
