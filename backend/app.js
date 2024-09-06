const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");

const imageRouter = require("./routes/image.route");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.options("*", cors());

// body parser, reading data from body into req.body
// limiting amount of data comes in the body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use(morgan("dev"));

app.use("/api/images", imageRouter);

module.exports = app;
