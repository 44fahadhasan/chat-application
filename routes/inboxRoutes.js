// // Import dependencies
const express = require("express");
const { getInboxPage } = require("../controllers/inboxController");
const { checkToken } = require("../middlewares/common/verifiyToken");

// init inbox route
const inboxRouter = express.Router();

inboxRouter.get("/", checkToken, getInboxPage);

module.exports = inboxRouter;
