// Import dependencies
const fs = require("fs");
const path = require("path");

const handleFileDelete = (dirPath, filename) => {
  // File path where the file save here
  const filePath = path.join(dirPath, "../uploads/avatars", filename);

  // Resolve the path to absolute
  const resolvedFilePath = path.resolve(filePath);
  console.log({ resolvedFilePath });

  // Check if the file exists then delete the file
  fs.access(resolvedFilePath, fs.constants.F_OK, (accessErr) => {
    if (accessErr) {
      console.error("File not found:", accessErr);
      return;
    }

    // Safely delete the file if it exists
    fs.unlink(resolvedFilePath, (unlinkErr) => {
      if (unlinkErr) {
        console.error("Failed to delete file:", unlinkErr);
      } else {
        console.log(`File deleted successfully: ${resolvedFilePath}`);
      }
    });
  });
};

module.exports = handleFileDelete;
