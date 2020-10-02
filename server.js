var express = require("express"),
  app = express(),
  port = process.env.PORT || 3000,
  bodyparser = require("body-parser"),
  controller = require("./controller");

const fs = require("fs");
const morgan = require("morgan");

const bebas = fs.createWriteStream("./access.log", {
  flags: "a",
});

app.use(
  morgan("combined", {
    stream: bebas,
  })
);

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

var routes = require("./routes");
routes(app);

app.listen(port);
console.log("Server Started On Port " + port);
