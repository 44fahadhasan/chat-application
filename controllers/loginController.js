// Get login page
const getLoginPage = (req, res, next) => {
  try {
    // Ensure the view exists and render it
    res.render("login");
  } catch (err) {
    // Handle render error
    next(err);
  }
};

module.exports = {
  getLoginPage,
};
