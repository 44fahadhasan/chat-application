// // Import dependencies
const { check, validationResult } = require("express-validator");

// Validation for login input fields
const loginInputFiledValidation = [
  check("username")
    .isLength({ min: 1 })
    .withMessage("Email or mobile number is required"),

  check("password").isLength({ min: 1 }).withMessage("Password is required"),
];

// Error handler for validation results
const loginInputValidatinHandler = (req, res, next) => {
  const errors = validationResult(req);

  // If no errors, proceed to the next middleware
  if (errors.isEmpty()) {
    return next();
  }

  // Extract all error messages
  const allErrors = errors.mapped();

  // Return  error with details
  return res.render("login", {
    data: {
      username: req.body.username,
    },
    errors: allErrors,
  });
};

module.exports = {
  loginInputFiledValidation,
  loginInputValidatinHandler,
};
