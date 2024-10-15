// Import dependencies
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Pepole = require("../mongoose/models/Pepole");
const createError = require("http-errors");

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

// handle user login
const handleUserLogin = async (req, res) => {
  try {
    const user = await Pepole.findOne({
      $or: [{ email: req.body.username }, { mobile: req.body.username }],
    });

    if (user && user._id) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (isValidPassword) {
        const userInfo = {
          userId: user._id,
          username: user.name,
          mobile: user.mobile,
          email: user.email,
          avatar: user.avatar,
          role: user.role,
        };

        // Create a token
        const token = jwt.sign(userInfo, process.env.TOKEN_KEY, {
          expiresIn: 900000,
        });

        // Set cookie
        res.cookie("chat-application", token, {
          maxAge: 900000,
          httpOnly: true,
          signed: true,
        });

        res.locals.loggedUserInfo = userInfo;

        res.render("inbox");
      } else {
        throw createError("Login failed! Please try again.");
      }
    } else {
      throw createError("Login failed! Please try again.");
    }
  } catch (error) {
    res.render("login", {
      data: {
        username: req.body.username,
      },

      errors: {
        common: {
          msg: error.message,
        },
      },
    });
  }
};

// handle user logout
const handleUserLogout = (req, res) => {
  res.clearCookie("chat-application");
  res.send("Logout succesfull");
};

module.exports = {
  getLoginPage,
  handleUserLogin,
  handleUserLogout,
};
