const getLoginPage = (req, res, next) => {
  res.render("login");
};

module.exports = {
  getLoginPage,
};
