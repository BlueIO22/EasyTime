var express = require('express');
var sessions = require('express-session');
var bodyParser = require('Body-Parser');
var cookieParser = require('Cookie-Parser');
var fs = require('fs');
var mysql = require('mysql');
var router = express.Router();
var app = express();
var server = require('http').Server(app);

var io = require('socket.io')(server);


server.listen(8080);


var connection = mysql.createConnection({
  host: '127.0.0.1', 
  user: 'root',
 
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
 
connection.query('USE users');

  router.get('/', function(req, res, next) {

    try{
    if(session.uniqueID !== undefined){
         
    	  var obj = readJSONFile('public/jsonlib/design.json');
     	  console.log(obj.program);
        res.render('index', obj.program); 
    }else{
          	  var obj = readJSONFile('public/jsonlib/design.json');

        res.render('login.hjs', obj.program);
    }}catch(exception){
          	  var obj = readJSONFile('public/jsonlib/design.json');

        res.render('login.hjs', obj.program);
    }
  
 });

 function readJSONFile(filepath){
  var file = fs.readFileSync(filepath, 'utf-8');
  return JSON.parse(file);

 }


 router.get('/demo', function(req, res){
   console.log(req.body);
 	res.render('demo', {});
 });

 router.post('/userdisconnect', function(req, res){
   session.destroy();
   if(session==undefined){
     
     res.send('Du er logget ut!');
     res.render('login');
   }else{
     res.send('en feil oppstod du er ikke logget ut.');
   }
 }); 
 //Socket:
 io.sockets.on('connection', function(socket){

    socket.on('getMessage', function(data){
         io.sockets.emit('sendMessage', JSON.stringify(data));
    });

    socket.on('hello', function(data){
      io.sockets.emit('world', data);
    });
    
 });
 
 
 
  


module.exports = router;
