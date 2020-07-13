const user = require("./user")
const authorization = require("./authorization")

module.exports = (app) => {
  app.use("/auth", authorization);
  app.use("/user", user);
};
