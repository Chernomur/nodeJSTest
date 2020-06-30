const db = require("../models")


module.exports = {

  allUsers: async function allUsers(req, res) {
    try {
      const users = await db.User.find();
      res.json(users);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  },
  findOne: async function findOne(req, res) {
    try {
      const id = req.params.id;
      const user = await db.User.findOne({_id: id});
      res.json(user)
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  },
  save: async function save(req, res) {
    try {
      if (!req.body) {
        return res.sendStatus(400);
      }
      const userName = req.body.fullName;
      const userEmail = req.body.email;
      const user = new db.User({fullName: userName, email: userEmail});
      const newUser = await user.save();
      res.send(newUser);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  },

  delete: async function (req, res) {
    try {
      const id = req.params.id;
      const user = await db.User.findByIdAndDelete(id);
      res.send(user);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }

  },
  update: async function (req, res) {
    try {
      if (!req.body) return res.sendStatus(400);
      const id = req.body.id;
      const userName = req.body.fullName;
      const email = req.body.email;
      const newUser = {email: email, fullName: userName};
      const user = await db.User.findOneAndUpdate({_id: id}, newUser, {new: true});
      res.send(user);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }

  }
}
