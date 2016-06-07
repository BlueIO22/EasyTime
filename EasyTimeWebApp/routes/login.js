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

var username;

connection.query('USE users');

var session; 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));



router.get('/redirects', function(req, res){
  session = req.session;
  if(session.uniqueID){
    res.redirect('index'); 
  }else{
    res.redirect('/login');
  }
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Index | EasyTime', company: 'Marinaden' });
});


router.post('/tryLogin', function(req, res){
  session = req.session;
  var loggedin = false;
  res.header('Content-Type', 'application/json; charset=utf-8');
  var obj = req.body;

  connection.query('select id from users where username="' + obj.username + '" and password="' + obj.password +  '"', function(err, rows, fields){
    
      
    if(rows.length != 0){
      console.log('hello');
        var id = rows[0].id;
            username = obj.username;
            res.send({response: 'OK', url: 'http://localhost:3000/redirects'}); 
            session.uniqueID = id;
            console.log(session.uniqueID);
    }else{
       res.send({response: 'Brukernavn eller passord er feil.'});
    }
    
  });
   
});

module.exports = router;
