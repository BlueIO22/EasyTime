var express = require('express');
var path = require('path');
var sessions = require('express-session');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session;
var routes = require('./routes/login');
var index = require('./routes/index');
var easytimeexcel = require('./routes/easytimeexcel');
var app = express();
   
// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cookieParser());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(sessions({
  secret: 'dlwadwikpaipPWDLÆaddw',
  saveUnitialized: true,
  resave: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/index', index);
app.use('/easytimeexcel', easytimeexcel);

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
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
 
