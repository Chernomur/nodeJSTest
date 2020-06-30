const mongoose = require("mongoose");
const express = require("express");
const app = require("./app");

mongoose.connect("mongodb://localhost:27017/usersdb", {useNewUrlParser: true}, function (err) {
  if (err) return console.log(err);
  app.listen(3000, function () {
    console.log("Сервер ожидает подключения...");
  });
});
