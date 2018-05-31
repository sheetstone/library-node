const express = require('express');

const bookRouter = express.Router();

const { books } = require('../api/db.json').schema;
const nav = require('../api/nav');

bookRouter.route('/')
  .get((req, res) => {
    res.render('bookList', {
      title: 'Books',
      books,
      nav,
    });
  });

bookRouter.route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    res.render('bookView', {
      title: 'Book',
      book: books[id],
      nav,
    });
  });

module.exports = bookRouter;
