const { MongoClient } = require('mongodb');
const debug = require('debug')('app:local.strategy');
const passport = require('passport');
const { Strategy } = require('passport-local');

module.exports = function localStrategy() {
  passport.use(new Strategy({
    usernameField: 'userid',
    passwordField: 'password',
  }, (userid, password, done) => {
    const url = 'mongodb://localhost:27017';
    const dbName = 'libraryApp';

    (async function validatinguser() {
      let client;
      try {
        client = await MongoClient.connect(url, { useNewUrlParser: true });
        debug('Connected correctly to server');
        const db = client.db(dbName);
        const col = await db.collection('users');
        const user = await col.findOne({ userid });
        debug(user);
        if (user === null) {
          done(null, false);
        } else if (user.password === password) {
          done(null, user);
        } else {
          done(null, false);
        }
        client.close();
      } catch (err) {
        debug(err.stack);
      }
    }());
  }));
};
