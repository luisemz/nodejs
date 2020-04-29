const express = require("express"),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  app = express(),
  port = process.env.PORT || 3000;

if (process.env.ENV === "test") {
  console.log("Connect to test db");
  mongoose.connect("mongodb://localhost/bookAPI_Test");
} else {
  console.log("Connect to production db");
  mongoose.connect("mongodb://localhost/bookAPI");
}

const bookRouter = require("./routes/bookRouter")();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api", bookRouter);

app.get("/", (req, res) => {
  res.send("Welcome to my API!");
});

app.server = app.listen(port, () => {
  console.log(`Running on port: ${port}`);
});

module.exports = app;
