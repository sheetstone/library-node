const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan'); //  morgan make web traffic display in console.
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;
const bookRouter = express.Router();

app.use(morgan('tiny'));

app.use(express.static(path.join(__dirname, '/public')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
// app.set('view engine', 'pug'); // view templete pug
app.set('view engine', 'ejs');

bookRouter.route('/')
  .get((req, res) => {
    res.render('books', {
      title: 'Books',
      nav: [
        { link: '/books', title: 'Books' },
        { link: '/authors', title: 'Authors' }],
    });
  });

app.use('/books', bookRouter);

app.get('/', (req, res) => {
  // res.sendFile(path.join(__dirname, 'views/index.html')); // static load some static content
  res.render('index', {
    title: 'MyLibrary',
    nav: [
      { link: '/books', title: 'Books' },
      { link: '/authors', title: 'Authors' }],
  });
});

app.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`);
});
