var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var passport = require('passport');
require('./models/badges.js');
require('./models/users.js');
require('./config/passport');
mongoose.connect('mongodb://localhost/livelihood')

// Define routes and subroutes.
var routes = require('./routes/index');
var users = require('./routes/users');
var badges = require('./routes/badges');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'public/views'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

app.use('/', routes);
app.use('/users', users);
app.use('/badges', badges);

/* GET home page. */
app.get('/', function(req, res, next) {
  res.sendFile(
    '/views/index.html',
    { root: path.join(__dirname, '../', 'public') },
    function(err){
      if (err){
        console.log(err);
        res.status(err.status).end();
      }
      else{
        console.log('Sent: index.html');
    }
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
});


module.exports = app;
