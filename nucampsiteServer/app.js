const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const createError = require('http-errors');
const mongoose = require('mongoose');
const passport = require('passport');
const authenticate = require('./authenticate');

const campsiteRouter = require('./routes/campsiteRouter');
const promotionRouter = require('./routes/promotionRouter');
const partnerRouter = require('./routes/partnerRouter');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// MongoDB connection
const url = 'mongodb://localhost:27017/nucampsite';
const connect = mongoose.connect(url, {});

connect.then(
  () => console.log('Connected correctly to server'),
  (err) => console.log(err)
);

// Middleware setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Passport and session configuration
app.use(
  session({
    name: 'session-id',
    secret: '12345-67890-09876-54321', // Replace with environment variable for production
    saveUninitialized: false,
    resave: false,
    store: new FileStore(),
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Authentication middleware
function auth(req, res, next) {
  console.log(req.user);

  if (!req.user) {
    const err = new Error('You are not authenticated!');
    err.status = 401;
    return next(err);
  } else {
    return next();
  }
}

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Apply `auth` middleware to protected routes
app.use(auth);
app.use('/campsites', campsiteRouter);
app.use('/promotions', promotionRouter);
app.use('/partners', partnerRouter);

// Error handling
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;