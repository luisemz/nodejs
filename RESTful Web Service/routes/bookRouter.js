const express = require("express"),
  Book = require("../models/bookModel"),
  booksController = require("../controller/booksController");

module.exports = function() {
  const bookRouter = express.Router();
  const controller = booksController(Book);
  bookRouter
    .route("/books")
    .post(controller.post)
    .get(controller.get);

  bookRouter.use("/books/:bookId", (req, res, next) => {
    let id = req.params.bookId;
    Book.findById(id, (err, book) => {
      if (err) {
        return res.json(err);
      }
      if (book) {
        req.book = book;
        return next();
      }
      return res.sendStatus(404);
    });
  });
  bookRouter
    .route("/books/:bookId")
    .put((req, res) => {
      let { book } = req;
      book.title = req.body.title;
      book.author = req.body.author;
      book.genre = req.body.genre;
      book.read = req.body.read;
      req.book.save(err => {
        if (err) {
          return res.send(err);
        }
        return res.json(book);
      });
    })
    .patch((req, res) => {
      let { book } = req;

      if (req.body._id) delete req.body._id;
      Object.entries(req.body).forEach(item => {
        let key = item[0];
        let value = item[1];
        book[key] = value;
      });
      req.book.save(err => {
        if (err) {
          return res.send(err);
        }
        return res.json(book);
      });
    })
    .delete((req, res) => {
      req.book.remove(err => {
        if (err) {
          return res.send(err);
        }
        return res.sendStatus(204);
      });
    })
    .get((req, res) => {
      return res.json(req.book);
    });

  return bookRouter;
};
