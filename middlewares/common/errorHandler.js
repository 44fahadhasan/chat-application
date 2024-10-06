// Import dependencies
const createError = require("http-errors");

// Handle not found (404 page)
const notFoundPage = (req, res, next) => {
  next(createError(404, "Your Requested Page Not Found"));
};

// Default global error handler
const globalErrorHandler = (err, req, res, next) => {
  res.locals.error =
    process.env.NODE_ENV === "development"
      ? err
      : {
          message: err?.message,
        };

  res.status(err.status || 500);

  if (res.locals.html) {
    // HTML response
    res.render("error", {
      title: "Error page",
    });
  } else {
    // JSON response
    res.json(res.locals.error);
  }
};

module.exports = {
  notFoundPage,
  globalErrorHandler,
};
