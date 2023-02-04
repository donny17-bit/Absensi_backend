const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const compression = require("compression");
const bodyParser = require("body-parser");

const app = express();
const port = 3306;

// routes --
const routerNavigation = require("./src/routes");

// middleware
app.use(express.static("public"));
app.use(morgan("dev"));
app.use(helmet());
app.use(xss());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(compression());

// app.use("/", routerNavigation);

app.get("/", async (req, res) => {
  res.status(200);
  res.send("Hello World!");
});

app.get("/hello", (req, res) => {
  res.status(200);
  res.send("Hello World!");
});

app.use("/*", (request, response) => {
  response.status(404).send("path not found");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
