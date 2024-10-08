// Get login page
const getInboxPage = (req, res, next) => {
  try {
    // Ensure the view exists and render it
    res.render("inbox");
  } catch (err) {
    // Handle render error
    next(err);
  }
};

module.exports = {
  getInboxPage,
};
