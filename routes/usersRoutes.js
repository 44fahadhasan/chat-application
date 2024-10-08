// Import dependencies
const express = require("express");
const {
  getUserPage,
  removeUser,
  createNewUser,
} = require("../controllers/usersController");
const handleAvatarUpload = require("../middlewares/user/handleAvatarUpload");
const {
  userInputFiledValidation,
  inputValidatinHandler,
} = require("../middlewares/user/inputFiledValidation");

// init users route
const usersRouter = express.Router();

// Get users page
usersRouter.get("/", getUserPage);

// Create a new user
usersRouter.post(
  "/",
  handleAvatarUpload,
  userInputFiledValidation,
  inputValidatinHandler,
  createNewUser
);

// Delete a user
usersRouter.delete("/:id", removeUser);

module.exports = usersRouter;
