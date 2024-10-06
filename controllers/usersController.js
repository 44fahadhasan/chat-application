const getUserPage = (req, res, next) => {
  res.render("users");
};

module.exports = {
  getUserPage,
};
