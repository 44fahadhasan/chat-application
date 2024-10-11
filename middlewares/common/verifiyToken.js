// Import dependencies
const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  let cookies =
    Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;

  if (cookies) {
    try {
      const token = cookies["chat-application"];

      const decoded = jwt.verify(token, process.env.TOKEN_KEY);
      req.userInfo = decoded;

      if (res.locals.html) {
        res.locals.loggedUserInfo = decoded;
      }
      next();
    } catch (error) {
      if (res.locals.html) {
        res.redirect("/");
      } else {
        res.status(500).json({
          errors: {
            common: {
              msg: error,
            },
          },
        });
      }
    }
  } else {
    if (res.locals.html) {
      res.redirect("/");
    } else {
      res.status(500).json({
        errors: {
          common: {
            msg: error,
          },
        },
      });
    }
  }
};

const allReadyLogin = (req, res, next) => {
  let cookies =
    Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;

  if (cookies) {
    res.redirect("/inbox");
  } else {
    next();
  }
};

module.exports = { checkToken, allReadyLogin };
