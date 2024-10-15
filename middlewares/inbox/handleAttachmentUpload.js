// Import dependencies
const uploader = require("../../utils/singleImgUploadar");

const handleAttachmentUpload = (req, res, next) => {
  const upload = uploader(
    "attachments",
    ["image/jpeg", "image/jpg", "image/png"],
    1000000,
    3,
    "Only .jpg, jpeg or .png format allowed!"
  );

  // Use multer middleware to handle the file upload
  upload.any()(req, res, (err) => {
    if (err) {
      return res.status(500).json({
        errors: {
          avatar: {
            msg: err.message,
          },
        },
      });
    }
    next();
  });
};

module.exports = handleAttachmentUpload;
