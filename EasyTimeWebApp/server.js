var express = require('express');
var sessions = require('express-session');
var cookieParser = require('Cookie-Parser');
var morgan = require('morgan');	 
var bodyParser = require('Body-Parser');

var app = express();
var port = process.env.PORT || 3000;


app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());
app.use(bodyParser.json);
app.use(sessions({
	secret: 'dlwadwikpaipPWDLÆaddw',
	saveUnitialized: true,
	resave: true
}));



app.use('/', function(req, res){
	res.send('hello world!');	
	console.log(req.cookies);
	console.log(req.session);	
});

module.export = app;

app.listen(port);

console.log('Server is running!');