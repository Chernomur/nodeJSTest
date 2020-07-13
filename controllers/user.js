const db = require("../models")
const crypto = require("../utils/crypto")
const validation = require("../utils/validation")


module.exports = {

  allUsers: async function allUsers(req, res) {
    try {
      const users = await db.User.find().select("-password");
      res.json(users);
    } catch (e) {
      console.error(e);
      res.send(e.message);
      return;
    }
  },
  findOne: async function findOne(req, res) {
    try {
      const {id} = req.params;

      if (req.user.role !== "admin" && !req.user._id === id) {
        res.sendStatus(403);
        return;
      }

      let user = await db.User.findOne({_id: id}).select("-password");
      res.json(user)

    } catch (e) {
      console.error(e);
      res.send(e.message);
      return;
    }
  },
  create: async function create(req, res) {
    try {

      const {fullName, email, password} = req.body;
      let user = new db.User({fullName, email, password: crypto(password)});
      await user.save();
      user = user.toJSON();
      delete user.password;
      res.json(user);
    } catch (e) {
      console.error(e.name);
      const valid=validation(e);
      res.status(valid.code).send(valid.message);
      return;
    }
  },

  delete: async function (req, res) {
    try {
      const id = req.params.id;
      if (req.user.role !== "admin" && !req.user._id === id) {
        res.sendStatus(403);
        return;
      }
      await db.User.findByIdAndDelete(id);
      res.sendStatus(204);

    } catch (e) {
      console.error(e);
      res.send(e.message);
      return;
    }

  },
  update: async function (req, res) {
    try {
      const {id} = req.params;
      if (req.user.role !== "admin" && !req.user._id === id) {
        res.sendStatus(403);
        return;
      }
      let user = await db.User.findById(id);

      const {fullName, email, password} = req.body;
      if (fullName) {
        user.fullName = fullName
      }

      if (email) {
        user.email = email;
      }
      if (password) {
        user.password = crypto(password);
      }
      await user.save();
      user = user.toJSON();
      delete user.password;
      res.json(user);
    } catch (e) {
      console.error(e);
      const valid=validation(e);
      res.status(valid.code).send(valid.message);
      return;
    }
  },
}
