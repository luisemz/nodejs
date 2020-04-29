require("should");
process.env.ENV = "test";

const request = require("supertest"),
  mongoose = require("mongoose"),
  app = require("../app"),
  Book = mongoose.model("Book"),
  agent = request.agent(app);

describe("Book CRUD Test", () => {
  it("should allow a book to be posted and return read and _it", done => {
    let bookPost = { title: "Test Book", author: "Test", genre: "Test" };

    agent
      .post("/api/books")
      .send(bookPost)
      .expect(201)
      .end((err, results) => {
        //console.log(results);
        results.body.read.should.not.equal("false");
        results.body.should.have.property("_id");
        done();
      });
  });

  afterEach(done => {
    Book.deleteMany({}).exec();
    done();
  });

  after(done => {
    mongoose.connection.close();
    app.server.close(done());
  });
});
