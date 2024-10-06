// // Import dependencies
const express = require("express");
const { getLoginPage } = require("../controllers/loginController");

// // init login route
const loginRouter = express.Router();

loginRouter.get("/", getLoginPage);

module.exports = loginRouter;
