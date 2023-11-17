// Server - running on Node.js
const express = require("express");
const locations = require("../config/locations");
const googleModel = require("../models/Google");

const app = express();
const router = express.Router();
const dotenv = require("dotenv");
const http = require("http");
const logger = require("morgan");
const path = require("path");
const router = require("./routes/index");
const { auth } = require("express-openid-connect");

dotenv.load();

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

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

const config = {
  authRequired: false,
  auth0Logout: true,
};

const port = process.env.PORT || 3001;
if (
  !config.baseURL &&
  !process.env.BASE_URL &&
  process.env.PORT &&
  process.env.NODE_ENV !== "production"
) {
  config.baseURL = `http://localhost:${port}`;
}

app.use(auth(config));

// Middleware to make the `user` object available for all views
app.use(function (req, res, next) {
  res.locals.user = req.oidc.user;
  next();
});

app.use("/", router);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error handlers
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: process.env.NODE_ENV !== "production" ? err : {},
  });
});

http.createServer(app).listen(port, () => {
  console.log(`Listening on ${config.baseURL}`);
});

module.exports = routes;
