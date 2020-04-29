module.exports = function(Book) {
  function post(req, res) {
    let book = new Book(req.body);
    if (!book.title) {
      res.status(400);
      return res.send("Title is required");
    }

    book.save();
    res.status(201);
    return res.json(book);
  }

  function get(req, res) {
    let query = {};
    if (req.query.genre) {
      query.genre = req.query.genre;
    }
    Book.find(query, (err, books) => {
      if (err) {
        return res.json(err);
      }
      return res.json(books);
    });
  }

  return { post, get };
};
