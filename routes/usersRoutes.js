// // Import dependencies
const express = require("express");
const { getUserPage } = require("../controllers/usersController");

// init users route
const usersRouter = express.Router();

usersRouter.get("/", getUserPage);

module.exports = usersRouter;
