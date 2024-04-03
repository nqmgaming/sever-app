const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/controller/user.controller');
const productRouter = require('./routes/controller/product.controller');
const categoryRouter = require('./routes/controller/category.controller');
const CartRouter = require('./routes/controller/cart.controller');
const SizeRouter = require('./routes/controller/size.controller');
const FavoriteRouter = require('./routes/controller/favorite.controller');
const database = require('./config/db');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/v1/user/', usersRouter);
app.use('/api/v1/product/', productRouter);
app.use('/api/v1/category/', categoryRouter);
app.use('/api/v1/cart/', CartRouter);
app.use('/api/v1/size/', SizeRouter);
app.use('/api/v1/favorite/', FavoriteRouter);
database().then(() => {
  console.log('Connected to the database');
  //log link
  console.log('http://localhost:3001/');
}).catch(error => {
  console.log('Error connecting to the database');
  console.log(error);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
