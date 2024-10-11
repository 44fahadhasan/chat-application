const handlePageTitle = (title) => {
  return (req, res, next) => {
    res.locals.html = true;
    res.locals.title = `${title} - Chat Application`;
    res.locals.loggedUserInfo = {};
    res.locals.data = {};
    res.locals.errors = {};

    next();
  };
};

module.exports = handlePageTitle;
