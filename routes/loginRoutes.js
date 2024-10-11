// // Import dependencies
const express = require("express");
const {
  getLoginPage,
  handleUserLogin,
  handleUserLogout,
} = require("../controllers/loginController");
const {
  loginInputFiledValidation,
  loginInputValidatinHandler,
} = require("../middlewares/login/inputFiledValidation");
const { allReadyLogin } = require("../middlewares/common/verifiyToken");

// // init login route
const loginRouter = express.Router();

loginRouter.get("/", allReadyLogin, getLoginPage);

// user login
loginRouter.post(
  "/",
  loginInputFiledValidation,
  loginInputValidatinHandler,
  handleUserLogin
);

// user logoout
loginRouter.delete("/", handleUserLogout);

module.exports = loginRouter;
