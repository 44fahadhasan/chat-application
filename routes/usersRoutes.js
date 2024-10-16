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
const { checkToken, checkRole } = require("../middlewares/common/verifiyToken");

// init users route
const usersRouter = express.Router();

// Get users page
usersRouter.get("/", checkToken, checkRole(["admin"]), getUserPage);

// Create a new user
usersRouter.post(
  "/",
  checkToken,
  handleAvatarUpload,
  userInputFiledValidation,
  inputValidatinHandler,
  createNewUser
);

// Delete a user
usersRouter.delete("/:id", checkToken, removeUser);

module.exports = usersRouter;
