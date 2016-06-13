var express = require('express');
var sessions = require('express-session');
var bodyParser = require('Body-Parser');
var mysql = require('mysql');
var cookieParser = require('Cookie-Parser');
var router = express.Router();
var fs = require('fs');
var app = express();

var connection = mysql.createConnection({
  host: '127.0.0.1', 
  user: 'root',
 
});

var username;

connection.query('USE users');


app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

 



router.get('/redirects', function(req, res){
  session = req.session;
  if(session.uniqueID){
    res.redirect('index'); 
  }else{
    res.redirect('/login');
  }
});

function readJSONFile(filepath){
  var file = fs.readFileSync(filepath, 'utf-8');
  return JSON.parse(file);

 }


router.get('/login', function(req, res, next) {
  var obj = readJSONFile('public/jsonlib/design.json');
  res.render('login', obj.program);
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
            res.send({response: 'Logget inn', url: 'http://localhost:3000/index', std: 'OK'}); 
            session.uniqueID = id;
            console.log(session);
    }else{
       res.send({response: 'Brukernavn eller passord er feil.', std: 'BAD'});
    }
    
  });
   
});

module.exports = router;
