const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:authRoutes');
const passport = require('passport');

const authRouter = express.Router();
const nav = require('../api/nav');

authRouter.route('/signUp')
  .post((req, res) => {
    const { userid, password } = req.body;
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';

    (async function addUser() {
      let client;
      try {
        client = await MongoClient.connect(url, { useNewUrlParser: true });
        debug('Connected correctly to server');
        const db = client.db(dbName);
        const col = await db.collection('users');
        const user = { userid, password };

        const response = await col.insertOne(user);
        // debug(response);
        req.login(response.ops[0], () => {
          res.redirect('/auth/profile');
        });
        client.close();
      } catch (err) {
        debug(err.stack);
      }
    }());
  });
authRouter.route('/signIn')
  .get((req, res) => {
    res.render('signIn', {
      title: 'Sign In',
      nav,
    });
  })
  .post(passport.authenticate('local', {
    successRedirect: '/auth/profile',
    failureRedirect: '/',
  }));
authRouter.route('/profile')
  .get((req, res) => {
    res.json(req.user);
  });

module.exports = authRouter;
