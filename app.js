const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan'); //  morgan make web traffic display in console.
const path = require('path');
const bookRouter = require('./src/routes/bookRoutes');
const nav = require('./src/api/nav');

const app = express();
const port = process.env.PORT || 3000;


app.use(morgan('tiny'));

app.use(express.static(path.join(__dirname, '/public')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
  res.render('index', {
    title: 'MyLibrary',
    nav,
  });
});
app.use('/books', bookRouter);

app.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`);
});
