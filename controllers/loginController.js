const getLoginPage = (req, res, next) => {
  res.render("login", {
    title: "Login - Chat Application",
  });
};

module.exports = {
  getLoginPage,
};
