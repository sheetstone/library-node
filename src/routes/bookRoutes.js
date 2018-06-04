const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:BookRoutes');

const bookRouter = express.Router();

// const { books } = require('../api/db.json').schema;
const nav = require('../api/nav');

bookRouter.route('/')
  .get((req, res) => {
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url, { useNewUrlParser: true });
        debug('Connected correctly to server');
        const db = client.db(dbName);
        const col = await db.collection('books');
        const books = await col.find().toArray();

        res.render('bookList', {
          title: 'Books',
          books,
          nav,
        });
        client.close();
      } catch (err) {
        debug(err.stack);
      }
    }());
  });

bookRouter.route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url, { useNewUrlParser: true });
        debug('Connected correctly to server');
        const db = client.db(dbName);
        const col = await db.collection('books');
        const book = await col.findOne({ _id: new ObjectID(id) });

        debug(book);
        res.render('bookView', {
          title: 'Book',
          book,
          nav,
        });

        client.close();
      } catch (err) {
        debug(err.stack);
      }
    }());
  });

module.exports = bookRouter;
