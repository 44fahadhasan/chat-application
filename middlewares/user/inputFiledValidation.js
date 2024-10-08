// Import dependencies
const { check, validationResult } = require("express-validator");
const Pepole = require("../../mongoose/models/Pepole");
const createError = require("http-errors");
const handleFileDelete = require("../../utils/handleFileDelete");

// Validation for user input fields
const userInputFiledValidation = [
  // Name validation
  check("name")
    .isLength({ min: 1 })
    .withMessage("Name is required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name should contain only alphabetic characters")
    .trim(),

  // Email validation
  check("email")
    .isEmail()
    .withMessage("Invalid email address")
    .trim()
    .custom(async (value) => {
      try {
        const user = await Pepole.findOne({ email: value });
        if (user) {
          throw createError("This email is already in use");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),

  // Mobile number validation (Bangladesh format)
  check("mobile")
    .isMobilePhone("bn-BD", { strictMode: true })
    .withMessage("Please provide a valid Bangladeshi mobile number (+88)")
    .custom(async (value) => {
      try {
        const user = await Pepole.findOne({ mobile: value });
        if (user) {
          throw createError("This mobile number is already in use");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),

  // Password validation (strong password)
  check("password")
    .isStrongPassword()
    .withMessage(
      "Password must contain at least 8 characters and include an uppercase letter, a number, and a symbol"
    ),
];

// Error handler for validation results
const inputValidatinHandler = (req, res, next) => {
  const errors = validationResult(req);

  // If no errors, proceed to the next middleware
  if (errors.isEmpty()) {
    return next();
  }

  // Delete before upload file
  if (req.files.length > 0) {
    const { filename } = req.files[0];
    handleFileDelete(__dirname, filename);
  } else {
    console.error("No file uploaded.");
  }

  // Extract all error messages
  const allErrors = errors.mapped();

  // Return a 400 response with error details
  return res.status(400).json({
    message: "Validation failed",
    errors: allErrors,
  });
};

module.exports = {
  userInputFiledValidation,
  inputValidatinHandler,
};
