const express = require("express");
const jsonParser = express.json();
const app = express();
const f = require("./controllers/user")
const User = require("./models");
app.use(express.static(__dirname + "/public"));

app.get("/api/users", f.allUsers);

app.get("/api/users/:id", f.findOne);

app.post("/api/users", jsonParser, f.save);

app.delete("/api/users/:id", f.delete);

app.put("/api/users", jsonParser, f.update);

module.exports = app;