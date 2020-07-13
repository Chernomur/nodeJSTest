const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config")

mongoose.connect(`${config.mongoConnection}/${config.dbName}`, {useNewUrlParser: true}, function (err) {
  if (err) {return console.log(err);}
  app.listen(config.port, function () {

    console.log(`Сервер ожидает подключения порт ${config.port}...`);
  });
});
