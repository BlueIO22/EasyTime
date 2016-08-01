var express = require('express');
var sessions = require('express-session');
var bodyParser = require('Body-Parser');
var cookieParser = require('Cookie-Parser');
var fs = require('fs');
var mysql = require('mysql');
var router = express.Router();
var app = express();
var server = require('http').Server(app);
var Excel = require('exceljs');
var io = require('socket.io')(server);
var async = require('async');


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

router.get('/', function (req, res, next) {

  try {
    if (session.uniqueID !== undefined) {
      var obj = readJSONFile('public/jsonlib/design.json');
      res.render('index', obj.program);
    } else {
      var obj = readJSONFile('public/jsonlib/design.json');
      res.render('login.hjs', obj.program);
    }
  } catch (exception) {
    var obj = readJSONFile('public/jsonlib/design.json');
    res.render('login.hjs', obj.program);
  }

});

function readJSONFile(filepath) {
  var file = fs.readFileSync(filepath, 'utf-8');
  return JSON.parse(file);

}


router.get('/demo', function (req, res) {
 	res.render('demo', {});
});

router.post('/userdisconnect', function (req, res) {
  session.destroy();
  if (session == undefined) {

    res.send('Du er logget ut!');
    res.render('login');
  } else {
    res.send('en feil oppstod du er ikke logget ut.');
  }
});
//Socket:
io.sockets.on('connection', function (socket) {

  socket.on('getMessage', function (data) {
    io.sockets.emit('sendMessage', JSON.stringify(data));
  });

  socket.on('hello', function (data) {
    console.log("Hello World");
    io.sockets.emit('getInformation', JSON.stringify(data));
  });

  socket.on('sendJSON', function (data) {
    var obj = JSON.parse(data);

    io.sockets.emit('recieveJSON', obj);
  });



});

var personer = new Array();
var mider = [];
var interimlist = [];
var miderlist = [];
router.post("/getTimeAndDates", function (req, res) {
       async.waterfall([ 
         function (callback, hours, ev){
                   interimlist = [];
             connection.query('select * from registrations', function(err, rows){
              if(err){
                err;
              }
              else {
                if (rows.length > 0) {
                   
                  if (rows.length != 0) {
                    for (var i = 0; i < rows.length; i++) {
                      arrive = rows[i].timestamp_in;
                      leave = rows[i].timestamp_out;

                      var arriveDate = new Date(arrive * 1000);
                      var leaveDate = new Date(leave * 1000);
                      
                      var diff = (arriveDate.getHours() - leaveDate.getHours());

                      interimlist.push({
                        name: rows[i].firstname + " " + rows[0].lastname,
                        text: rows[i].time,
                        x: [rows[i].date],
                        y: [diff],
                        type: 'scatter'
                      });                   
                  
                   }
                       callback(null, interimlist);
                   }
                }
              }
            });
         },
         function (args, callback){
            io.sockets.emit('updateGraph', args);
 
         }
         ]);

});





router.post('/getBrukere', function (req, res) {
  var obj = req.body;
  var person = obj.text;
  console.log(obj);
  connection.query("select * from registrations", function (err, rows, fields) {
    if (err) {
      throw err;
    } else {
      if (rows.length != 0) {
        for (var i = 0; i < rows.length; i++) {
          var navn = rows[i].firstname + ' ' + rows[i].lastname;
          personer.push({ name: navn, firstname: rows[i].firstname, lastname: rows[i].lastname });
        }

      }
    }
    res.send(personer);



  });

});

router.get('/getExcelFile', function (req, res) {
  var book = new Excel.Workbook();
  book.creator = "EasyTime";
  var sheet = book.addWorksheet('Timeregistrering August');
  sheet.columns = [
    { header: 'Tid', key: 'time', width: 10 },
    { header: 'Bruker', key: 'user', width: 32 },
    { header: 'Dato', key: 'date', width: 10, outline: 1 }

  ];

  sheet.addRow({ time: '12:30', user: 'Marius Sørenes', date: '27.07.2016' });

  book.xlsx.writeFile('demo.xlsx').then(function () {

  });
});



router.post('/getSistebrukere', function (req, res) {

  connection.query('select id, firstname, lastname, company, type from registrations order by id desc limit 4', function (err, rows, fields) {
    var personer = [];
    if (rows.length != 0) {
      for (var i = 0; i < rows.length; i++) {
        var navn = rows[i].firstname + ' ' + rows[i].lastname;
        var pid = rows[i].id;
        var comp = rows[i].company;
        var tp = rows[i].type;

        personer.push({ name: navn, id: pid, bedrift: comp, type: tp });
      }
    }

    res.send(personer);


  });

});




module.exports = router;
