// Import dependencies
const Conversation = require("../mongoose/models/Conversation");
const Message = require("../mongoose/models/Message");
const Pepole = require("../mongoose/models/Pepole");
const escape = require("../utils/escape");
const createError = require("http-errors");

// Get login page
const getInboxPage = async (req, res, next) => {
  try {
    const conversations = await Conversation.find({
      $or: [
        { "creator.id": req.userInfo.userId },
        { "participant.id": req.userInfo.userId },
      ],
    });

    res.locals.data = conversations;

    // Ensure the view exists and render it
    res.render("inbox");
  } catch (err) {
    // Handle render error
    next(err);
  }
};

// Search an user for start to conversation
const searchUserStartToConversation = async (req, res, next) => {
  try {
    const user = req.body.user;
    const searchQuery = user.replace("+88", "");

    const name_search_regex = new RegExp(escape(searchQuery), "i");
    const mobile_search_regex = new RegExp("^" + escape("+88" + searchQuery));
    const email_search_regex = new RegExp("^" + escape(searchQuery) + "$", "i");
    //

    if (searchQuery === "") {
      throw createError("You must provide some text to search!");
    }

    const users = await Pepole.find(
      {
        $or: [
          {
            name: name_search_regex,
          },
          {
            mobile: mobile_search_regex,
          },
          {
            email: email_search_regex,
          },
        ],
      },
      "name avatar"
    );

    res.json(users);
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          msg: error.message,
        },
      },
    });
  }
};

// Create a new conversation
const createAnConversation = async (req, res, next) => {
  try {
    const newConversation = new Conversation({
      creator: {
        id: req.userInfo.userId,
        name: req.userInfo.username,
        avatar: req.userInfo.avatar || null,
      },

      participant: {
        name: req.body.participant,
        id: req.body.id,
        avatar: req.body.avatar || null,
      },
    });

    const result = await newConversation.save();

    res.status(200).json({
      message: "Conversation create successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          msg: error.message,
        },
      },
    });
  }
};

// Create a new message
const createAnMessage = async (req, res, next) => {
  if (req.body.message || (req.files && req.files.length > 0)) {
    try {
      // attachments
      let attachments = null;
      attachments = [];
      req?.files?.map((file) => {
        attachments.push(file.filename);
      });

      const newMessage = new Message({
        text: req.body.message,
        attachment: attachments,

        sender: {
          id: req.userInfo.userId,
          name: req.userInfo.username,
          avatar: req.userInfo.avatar || null,
        },

        receiver: {
          id: req.body.receiverId,
          name: req.body.receiverName,
          avatar: req.body.avatar || null,
        },

        conversation_id: req.body.conversationId,
      });

      const result = await newMessage.save();

      // emit socket event
      global.io.emit("new_message", {
        message: {
          conversation_id: req.body.conversationId,

          sender: {
            id: req.userInfo.userId,
            name: req.userInfo.username,
            avatar: req.userInfo.avatar || null,
          },

          message: req.body.message,
          attachment: attachments,
          date_time: result.date_time,
        },
      });

      res.status(200).json({
        message: "Successful!",
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        errors: {
          common: {
            msg: error.message,
          },
        },
      });
    }
  } else {
    return res.status(500).json({
      errors: {
        common: "message text or attachment is required!",
      },
    });
  }
};

// Get messages of a conversation
const getMsgOfConversation = async (req, res, next) => {
  try {
    const messages = await Message.find({
      conversation_id: req.params.id,
    }).sort("-createdAt");

    const { participant } = await Conversation.findById(req.params.id);

    res.status(200).json({
      data: {
        messages: messages,
        participant,
      },
      user: req.userInfo.userId,
      conversation_id: req.params.id,
    });
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          msg: error,
        },
      },
    });
  }
};

module.exports = {
  getInboxPage,
  searchUserStartToConversation,
  createAnConversation,
  createAnMessage,
  getMsgOfConversation,
};
