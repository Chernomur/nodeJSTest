const User = require("../models")
module.exports = {
  allUsers: function allUsers(req, res) {

    User.find({}, function (err, users) {

      if (err) return console.log(err);
      res.send(users)
    });
  },
  findOne: function (req, res) {

    const id = req.params.id;
    User.findOne({_id: id}, function (err, user) {

      if (err) return console.log(err);
      res.send(user);
    });
  },
  save: function (req, res) {

    if (!req.body) return res.sendStatus(400);

    const userName = req.body.name;
    const userAge = req.body.age;
    const user = new User({name: userName, age: userAge});

    user.save(function (err) {
      if (err) return console.log(err);
      res.send(user);
    });
  },
  delete: function (req, res) {

    const id = req.params.id;
    User.findByIdAndDelete(id, function (err, user) {

      if (err) return console.log(err);
      res.send(user);
    });
  },
  update: function (req, res) {

    if (!req.body) return res.sendStatus(400);
    const id = req.body.id;
    const userName = req.body.name;
    const userAge = req.body.age;
    const newUser = {age: userAge, name: userName};

    User.findOneAndUpdate({_id: id}, newUser, {new: true}, function (err, user) {
      if (err) return console.log(err);
      res.send(user);
    });
  }
}
