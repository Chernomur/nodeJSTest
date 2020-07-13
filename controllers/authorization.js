const db = require("../models")
const crypto = require("../utils/crypto")
const token = require("../utils/token")

const singIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await db.User.findOne({ email });
    if (!user) {
      return res.sendStatus(404);
    }
    if (crypto(password) !== user.password) {
      return res.sendStatus(400);
    }

    user = user.toJSON();
    delete user.password;
    res.json({ token: token.create(user._id), user });
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
}

module.exports = {
  singIn,
  singUp: async function singUp(req, res) {
    try {
      const { fullName, email, password } = req.body;

      let user = new db.User({ fullName, email, password: crypto(password) });

      await user.save();

      user = user.toJSON();
      delete user.password;

      res.json({ token: token.create(user._id), user });
    } catch (e) {
      // Validation errors
      console.error(e);
      res.sendStatus(500);
    }
  },
  check: async function check(req, res) {
    try {
      const user = req.user.toJSON();
      delete user.password;

      res.json(user);
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
    }
  }
};
