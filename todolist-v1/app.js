const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.get("/", function (req, res) {
  res.send("hello");
});

const port = 3000;
app.listen(port, function () {
  console.log("server started on port " + port);
});
