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
      return res.sendStatus(500);
    }
  },
  findOne: async function findOne(req, res) {
    try {
      const { id } = req.params;

      if (req.user.role !== "admin" && !req.user._id === id) {
        return res.sendStatus(403);
      }

      let user = await db.User.findOne({ _id: id }).select("-password");
      if (!user) {
        return res.sendStatus(404);
      }

      res.json(user)
    } catch (e) {
      console.error(e);
      res.send(e.message);
    }
  },
  create: async function create(req, res) {
    try {
      const { fullName, email, password } = req.body;

      // Password validation
      let user = new db.User({ fullName, email, password: crypto(password) });

      await user.save();
      user = user.toJSON();
      delete user.password;

      res.json(user);
    } catch (e) {
      console.error(e.name);
      const error = validation(e);
      res.status(error.code).send(error.message);
    }
  },

  delete: async function (req, res) {
    try {
      const id = req.params.id;

      if (req.user.role !== "admin" && !req.user._id === id) {
        return res.sendStatus(403);
      }

      await db.User.findByIdAndDelete(id);

      res.sendStatus(204);
    } catch (e) {
      // Add 404 error
      console.error(e);
      res.send(e.message);
    }

  },
  update: async function (req, res) {
    try {
      const { id } = req.params;
      const { fullName, email, password } = req.body;

      if (req.user.role !== "admin" && !req.user._id === id) {
        res.sendStatus(403);
        return;
      }
      let user = await db.User.findById(id);
      if (!user) {
        return res.sendStatus(404);
      }

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
      const error = validation(e);
      res.status(error.code).send(error.message);
    }
  },
};
