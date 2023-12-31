var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var indexRouter = require('./routes/index');
var logInRouter = require('./routes/logIn');
var signUpRouter = require('./routes/signUp');
var apiRouter = require('./routes/api');
var logoutRouter = require('./routes/logout');
var updateRouter = require('./routes/update');
var optionRouter = require('./routes/option');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'chaosRecipe',
  cookie: { secure: false },
  resave: false,
  saveUninitialized: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/', indexRouter);
app.use('/logIn', logInRouter);
app.use('/signUp', signUpRouter);
app.use('/api', apiRouter);
app.use('/logout', logoutRouter);
app.use('/update', updateRouter);
app.use('/option', optionRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;