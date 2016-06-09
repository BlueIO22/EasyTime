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
    session = req.session;
    if(session.uniqueID != 0){

    	var obj = readJSONFile('public/jsonlib/design.json');
     	console.log(obj.program);
        res.render('index', obj.program); 
    }else{
    
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
 
 //Socket:
 io.sockets.on('connection', function(socket){
   
   router.post('/sendsite', function(req, res){
      
     console.log(req.body);
     io.sockets.emit('new message', req.body);
   });
   socket.on('sendMessage', function(data){
      io.sockets.emit('new message', data);
   });
 });
 
 
 
  


module.exports = router;
