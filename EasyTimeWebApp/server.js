var express = require('express');
var sessions = require('express-session');
var cookieParser = require('Cookie-Parser');
var morgan = require('morgan');	 
var bodyParser = require('Body-Parser');
var path = require('path');
var app = express();
var port = process.env.PORT || 3000;
var index = require('./routes/index.js');
 

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());
 app.use(bodyParser.urlencoded({extended: true}));
app.use(sessions({
	secret: 'dlwadwikpaipPWDLÆaddw',
	saveUnitialized: true,
	resave: true
}));

 
app.set('view engine', 'hjs');
app.set('/', index);

app.get('/', function(req, res){
	res.render('index');
});

app.listen(port);

console.log('Server is running!');

module.export = app;

