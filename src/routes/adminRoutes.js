const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:adminRoutes');

const adminRouter = express.Router();
const { books } = require('../api/db.json').schema;

adminRouter.route('/')
  .get((req, res) => {
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url, { useNewUrlParser: true });
        debug('Connected correctly to server');

        const db = client.db(dbName);

        const response = await db.collection('books').insertMany(books);
        res.json(response);
        client.close();
      } catch (err) {
        debug(err.stack);
      }
    }());
  });

module.exports = adminRouter;
