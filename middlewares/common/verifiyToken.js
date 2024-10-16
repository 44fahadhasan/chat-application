// Import dependencies
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

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

const checkRole = (roleStatus) => {
  return (req, res, next) => {
    if (req.userInfo.role && roleStatus.includes(req.userInfo.role)) {
      next();
    } else {
      if (res.locals.html) {
        next(createError(401, "This page will not going to you"));
      } else {
        res.status(401).json({
          error: {
            common: {
              msg: "You are not authorized!",
            },
          },
        });
      }
    }
  };
};

module.exports = { checkToken, allReadyLogin, checkRole };
