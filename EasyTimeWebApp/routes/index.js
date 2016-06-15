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
  user: 'root'
 
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
      console.log("Hello World");
      io.sockets.emit('getInformation', JSON.stringify(data));
    });

    socket.on('sendJSON', function(data){
       var obj = JSON.parse(data);
       
       io.sockets.emit('recieveJSON', obj);
    });
    
 });

 router.post('/getBrukere', function(req, res){
    var obj = JSON.stringify(req.body);
    var person = obj.person;

    connection.query('select id, fornavn, etternavn from personer where fornavn LIKE ' + obj.person + ' or etternavn LIKE ' + obj.person, function(err, rows, fields){
       if(rows.length != 0){
         res.send(rows[0].navn);
       }
    });


 });

 router.post('/getSistebrukere', function(req, res){

    connection.query('select id, fornavn, etternavn from personer order by id desc limit 4', function(err, rows, fields){
               if(rows.length != 0){
                 for(var i = 0; i<rows.length; i++){
                  var navn = rows[i].fornavn + ' ' + rows[i].etternavn;
                  var pid = rows[i].id;

                  io.sockets.emit('getBrukere', {personer: {name: navn, id: pid}});
               }
               }
    });
 });
 
 
 
  


module.exports = router;
