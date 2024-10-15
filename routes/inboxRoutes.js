// // Import dependencies
const express = require("express");
const {
  getInboxPage,
  createAnConversation,
  getMsgOfConversation,
  createAnMessage,
  searchUserStartToConversation,
} = require("../controllers/inboxController");
const { checkToken } = require("../middlewares/common/verifiyToken");
const handleAttachmentUpload = require("../middlewares/inbox/handleAttachmentUpload");

// init inbox route
const inboxRouter = express.Router();

// Get inbox page
inboxRouter.get("/", checkToken, getInboxPage);

// Search an user for create a new conversation
inboxRouter.post("/search", checkToken, searchUserStartToConversation);

// Create a new conversation
inboxRouter.post("/conversation", checkToken, createAnConversation);

// Create a new message(send message)
inboxRouter.post(
  "/message",
  checkToken,
  handleAttachmentUpload,
  createAnMessage
);

// Get all message of a conversation
inboxRouter.get("/messages/:id", checkToken, getMsgOfConversation);

module.exports = inboxRouter;
