const getInboxPage = (req, res, next) => {
  res.render("inbox", {
    title: "Inbox - Chat Application",
  });
};

module.exports = {
  getInboxPage,
};
