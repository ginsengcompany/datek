const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const session = require('express-session');

let indexRouter = require('./routes/index');
let datiRouter = require('./routes/dati');
let databaseRouter = require('./routes/database');
let powerbiRouter = require('./routes/powerbi');
let datiStatistici = require('./routes/datiStatistici');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Session
app.use(session({
    secret: 'Progetto COSA',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 1000 * 30
    }
}));

app.use('/', indexRouter);
app.use('/dati', datiRouter);
app.use('/database', databaseRouter);
app.use('/powerbi', powerbiRouter);
app.use('/datistatistici', datiStatistici)

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
