const express = require("express");
const mongoose = require("mongoose");
const Book = require("./models/bookModel.cjs");
const booksRoute = require("./routes/booksRoutes.cjs");
const cors = require("cors");
const router = express.Router();
async function startServer() {
  require("dotenv").config(); // 移动到开始位置以确保在加载环境变量之前

  const { PORT, mongoDBURL } = require("./config.cjs");

  const app = express();

  // Middleware to parse JSON bodies
  app.use(express.json());

  app.use(cors());

  // Route handler for the root endpoint
  app.get("/", (request, response) => {
    console.log(request);
    return response.status(234).send("server running");
  });

  // Mounting the booksRoute router
  app.use("/books", booksRoute);

  // Error handling middleware
  app.use((err, req, res, next) => {
    // JSON parsing error
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
      return res.status(400).json({ message: "Invalid JSON payload" });
    }
    // Other errors
    else {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });

  // Connect to MongoDB and start the server
  mongoose
    .connect(process.env.MONGODB_URL) // 使用 process.env.MONGODB_URL
    .then(() => {
      console.log(`App connected to database`);

      app.listen(PORT, () => {
        console.log(`App is listening to port: ${PORT}`);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

startServer();
