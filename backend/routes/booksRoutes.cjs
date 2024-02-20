const express = require("express");
const router = express.Router();
const Book = require("../models/bookModel.cjs");

//get all books from database
router.get("/", async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});
//get one book from database by id
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);
    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});

//update one book  by id
router.put("/:id", async (request, response) => {
  try {
    const { title, author, publishYear } = request.body;
    if (!title || !author || !publishYear) {
      return response.status(400).send({
        message: "Send all required fields:title, author,publishYear",
      });
    }
    const { id } = request.params;
    const result = await Book.findByIdAndUpdate(id, request.body);
    if (!result) {
      return response.status(400).send({
        message: "book not found",
      });
    }
    return response.status(200).send({
      message: "Book updated successfully",
    });
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});

// Route handler for saving a new book
router.post("/", async (request, response) => {
  try {
    console.log("Request body:", request.body); // Log the request body
    const { title, author, publishYear } = request.body;

    // Check if all required fields are present
    if (!title || !author || !publishYear) {
      throw new Error("Send all required fields: title, author, publishYear");
    }

    const newBook = { title, author, publishYear };
    const book = await Book.create(newBook); // Using the Book model here
    return response.status(201).send(book);
  } catch (error) {
    console.log(error);
    return response.status(400).send({
      message: error.message,
    });
  }
});

// Route for delete s book
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Book not found" });
    }

    return response
      .status(200)
      .send({ message: "Book deleted succueefully !" });
  } catch (error) {
    console.log(error);
    return response.status(500).send({
      message: error.message,
    });
  }
});

module.exports = router;
