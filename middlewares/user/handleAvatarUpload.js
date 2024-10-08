// Import dependencies
const uploader = require("../../utils/singleImgUploadar");

// Handle avatar upload with multer
const handleAvatarUpload = (req, res, next) => {
  const upload = uploader(
    "avatars",
    ["image/jpg", "image/jpeg", "image/png"],
    1000000,
    "Only jpg, jpeg, or png format allowed"
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

module.exports = handleAvatarUpload;
