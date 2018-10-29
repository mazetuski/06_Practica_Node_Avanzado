// Dependencies
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const app = express();

const {isApi} = require('./lib/apiHelper');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Connect to database
require('./lib/connectMongoose');

// Import models
require('./models/Advertisement');

// Use session
app.use(session({
  name: "session-practica-6-Miguel-Zamora",
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 1000 * 60 * 60 * 24, httpOnly: true},
  store: new MongoStore({
    // conectar a la base de datos para guardar la session allí
    url: process.env.DB_URL
  })
}));

// helper middleware for get if user is auth
app.use((req, res, next) => {
  res.locals.isLogged = require('./lib/sessionAuth').isLogged(req);
  next();
});

// Import router
require('./router')(app);

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

  // check if api error
    if(isApi(req)){
        return res.json({success: false, error: err.message});
    }

  res.render('error');
});

module.exports = app;
