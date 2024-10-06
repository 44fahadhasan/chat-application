// Import dependencies
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const {
  globalErrorHandler,
  notFoundPage,
} = require("./middlewares/common/errorHandler");
const loginRouter = require("./routes/loginRoutes");
const usersRouter = require("./routes/usersRoutes");
const inboxRouter = require("./routes/inboxRoutes");

// Load environment variables
dotenv.config();

// Express app init
const app = express();

// Request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser
app.use(cookieParser(process.env.COOKIE_SECRET));

// Enable CORS
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Set view engine
app.set("view engine", "ejs");

// Set static folder for serving public files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", loginRouter);
app.use("/users", usersRouter);
app.use("/inbox", inboxRouter);

// Handle not found (404 page)
app.use(notFoundPage);

// Default global error handler
app.use(globalErrorHandler);

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
