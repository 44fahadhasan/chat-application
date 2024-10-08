// Import dependencies
const bcrypt = require("bcrypt");
const Pepole = require("../mongoose/models/Pepole");
const handleFileDelete = require("../utils/handleFileDelete");

// Get users page
const getUserPage = async (req, res, next) => {
  try {
    // Fetch all user from db
    const users = await Pepole.find();

    // Ensure the view exists and render it
    res.render("users", {
      users,
    });
  } catch (err) {
    // Handle render error
    next(err);
  }
};

// Create a new user
const createNewUser = async (req, res, next) => {
  let newUser;

  try {
    // Hash the password from req.body.password
    const hashPassword = await bcrypt.hash(req.body.password, 10);

    // Handle file upload (if applicable)
    if (req.files && req.files.length > 0) {
      newUser = new Pepole({
        ...req.body,
        password: hashPassword,
        avatar: req.files[0].filename, // Store the avatar filename
      });
    } else {
      newUser = new Pepole({
        ...req.body,
        password: hashPassword,
      });
    }

    // Save the new user in the database
    const result = await newUser.save();

    // Send success response
    res.status(200).json({
      message: "User created successfully",
      result,
    });
  } catch (error) {
    // Handle any unknown error during user creation
    res.status(500).json({
      errors: {
        common: {
          msg: "An unknown error occurred",
        },
      },
    });
  }
};

// Delete a user
const removeUser = async (req, res, next) => {
  try {
    const user = await Pepole.findByIdAndDelete({
      _id: req.params.id,
    });

    // Delete the file if it exist
    if (user?.avatar) {
      handleFileDelete(__dirname, user?.avatar);
    }

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserPage,
  createNewUser,
  removeUser,
};
