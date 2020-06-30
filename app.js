const express = require("express");
const jsonParser = require("body-parser")

const app = express();

const userController = require("./controllers/user")

app.use(express.static(__dirname + "/public"));

app.get("/api/users", userController.allUsers);

app.get("/api/users/:id", userController.findOne);

app.post("/api/users", jsonParser.json(), userController.save);

app.delete("/api/users/:id", userController.delete);

app.patch("/api/users", jsonParser.json(), userController.update);

module.exports = app;