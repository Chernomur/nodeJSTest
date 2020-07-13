const express = require("express");
const bodyParser = require("body-parser")
const routes = require("./routes")
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use ("/auth", routes.authorization);
app.use ("/user", routes.user);
module.exports = app;
