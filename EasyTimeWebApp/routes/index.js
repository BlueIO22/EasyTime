var express = require('express');
var sessions = require('express-session');
var bodyParser = require('Body-Parser');
var mysql = require('mysql');
var router = express.Router();
var app = express();

var connection = mysql.createConnection({
  host: '127.0.0.1', 
  user: 'root',
 
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
 
connection.query('USE users');

 
 router.get('/', function(req, res, next) {
    session = req.session;
    if(session.uniqueID){
        res.render('index', { title: 'Index | EasyTime', company: 'Marinaden' }); 
    }else{
    
    }
  
 });


module.exports = router;
