module.exports = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      res.sendStatus(403);
      return;
    }
    next();
  } catch (e) {
    console.error(e)
    res.sendStatus(500);
  }
}
