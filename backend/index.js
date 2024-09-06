/* eslint-disable no-console */
const mongoose = require("mongoose");
const dotenv = require("dotenv");

process.on("uncaughtException", (error) => {
  console.log(`UNCAUGHT EXCEPTION | SHUTTING DOWN ...`);
  console.log(error);
  process.exit(1);
});

dotenv.config({
  path: "./config.env",
});

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log(`Database connected successfully!`))
  .catch((error) => {
    console.log(`MongoDB Error: ${error}`);
  });

const app = require("./app");

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

process.on("unhandledRejection", (error) => {
  console.log(`UNHANDLED REJECTION | SHUTTING DOWN ...`);
  console.log(error.name, error.message);
  console.log(error);
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("👋 SIGTERM RECEIVED! Shutting down server!");
  server.close(() => {
    console.log("Process terminated");
  });
});
