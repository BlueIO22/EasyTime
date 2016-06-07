var express = require('express');
var sessions = require('express-session');
var bodyParser = require('Body-Parser');
var cookieParser = require('Cookie-Parser');
var mysql = require('mysql');
var router = express.Router();
var app = express();
 
var connection = mysql.createConnection({
  host: '127.0.0.1', 
  user: 'root',
 
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
 
connection.query('USE users');

 
 router.get('/', function(req, res, next) {
    session = req.session;
    if(session.uniqueID != 0){
        res.render('index', { 
        	title: 'Index | EasyTime', 
        	company: 'Marinaden',
        	name: 'EasyTime',
        	links: [{
        		url: 'http://google.com',
        		name: 'Google'
        	}, {
        		url: 'http://facebook.com',
        		name: 'facebook'
        	}]

    }); 
    }else{
    
    }
  
 });

 router.get('/demo', function(req, res){
 	res.render('demo', {});
 });


module.exports = router;
