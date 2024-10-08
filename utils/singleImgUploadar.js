// Import dependencies
const createError = require("http-errors");
const multer = require("multer");
const path = require("path");

const uploader = (folderPath, fileType, maxFileSize, errMsg) => {
  // File upload folder path
  const uploadFolder = `${__dirname}/../public/uploads/${folderPath}`;

  // Define the storage
  const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, uploadFolder);
    },

    filename: (req, file, callback) => {
      const fileExt = path.extname(file.originalname);
      const fileName =
        file.originalname
          .replace(fileExt, "")
          .toLowerCase()
          .split(" ")
          .join("-") +
        "-" +
        Date.now();
      callback(null, fileName + fileExt);
    },
  });

  const upload = multer({
    storage,

    limits: {
      fileSize: maxFileSize,
    },

    fileFilter: (req, file, callback) => {
      if (fileType.includes(file.mimetype)) {
        callback(null, true);
      } else {
        callback(createError(errMsg));
      }
    },
  });

  return upload;
};

module.exports = uploader;
