// // Import dependencies
const express = require("express");
const { getInboxPage } = require("../controllers/inboxController");

// init inbox route
const inboxRouter = express.Router();

inboxRouter.get("/", getInboxPage);

module.exports = inboxRouter;
