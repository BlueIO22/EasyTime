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
 
connection.query('USE demo');

  router.get('/', function(req, res, next) {

    try{
    if(session.uniqueID !== undefined){
    	  var obj = readJSONFile('public/jsonlib/design.json');
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
    var obj = req.body;
    var person = obj.text;
    console.log(obj);
    var personer = [];
    connection.query("select * from registrations", function(err, rows, fields){
       if(err){
            throw err;
        }else{
             if(rows.length != 0){ 
                  for(var i = 0; i<rows.length; i++){
                  var navn = rows[i].fornavn + ' ' + rows[i].etternavn;
                      personer.push({name: navn});
                  }
         
              }
        }
        res.send(personer);
       

       
    });

 });

router.post('/getSistebrukere', function(req, res){
  
    connection.query('select id, firstname, lastname, company, type from registrations order by id desc limit 4', function(err, rows, fields){
         var personer = [];
         if(rows.length != 0){
               for(var i = 0; i<rows.length; i++){
                  var navn = rows[i].firstname + ' ' + rows[i].lastname;
                  var pid = rows[i].id;
                  var comp = rows[i].company;
                  var tp = rows[i].type;
                   
                  personer.push({name: navn, id: pid, bedrift: comp, type: tp});
               }
         }

         res.send(personer);

         
    });
 
});
 
  


module.exports = router;
