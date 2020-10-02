const compression = require("compression");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const createError = require("http-errors");
const express = require("express");
const morgan = require("morgan");

// Routes
var restaurantRouter = require("./routes/restaurants");
var userRouter = require("./routes/users");

// Middlewares
const corsHandler = require("./middlewares/cors.handler");
const errorHandler = require("./middlewares/error.handler");

// Express app
var app = express();

// Enable CORS Requests
app.use(cors({ origin: corsHandler.allowedOrigins, preflightContinue: true }));

// Register middlewares
app.use(morgan("dev")); // HTTP request logger middleware for node.js
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression()); // Use gzip compression

//
// Router
//
app.get("/", async (req, res) => {
  res.status(200).end();
});
app.use("/restaurants", restaurantRouter);
app.use("/users", userRouter);

//
// Catch 404 and forward to error handler
//
app.use(function (req, res, next) {
  next(createError(404));
});

//
// Error-handling middleware functions
//
app.use(errorHandler);

module.exports = app;
