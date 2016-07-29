var express = require('express');
var router = express.Router();
var hogan = require('hogan.js');
var sessions = require('express-session');
var bodyParser = require('Body-Parser');
var cookieParser = require('Cookie-Parser');
var fs = require('fs');
var mysql = require('mysql');
var app = express();
var Excel = require('exceljs');
var request = require('ajax-request');
var path = require('path');


	router.get('/', function(req, res){
		var obj = readJSONFile('public/jsonlib/design.json');
		res.render('easytimeexcel', obj.program);
	});
		
	function readJSONFile(filepath){
		var file = fs.readFileSync(filepath, 'utf-8');
		return JSON.parse(file);

	}

	var connection = mysql.createConnection({
		host: '127.0.0.1', 
		user: 'root'
		
	});

	connection.query('USE users');
	
router.post('/getExcelFile', function(req, res){
    var book = new Excel.Workbook();
	book.creator = "EasyTime";
	var sheet = book.addWorksheet('Timeregistrering August');
	sheet.columns = [
		{ header: 'Tid', key: 'time', width:10},
		{ header: 'Bruker', key: 'user', width:32},
		{ header: 'Dato', key: 'date', width: 10, outline: 1}

	];
	
    connection.query('select * from registrations', function(err, rows, fields){
       if(rows.length !=0){
			for(i = 0; i<rows.length; i++){
				console.log(rows[i].time + "\n" + rows[i].name);	
				sheet.addRow({time: rows[i].time, user: rows[i].name, date: rows[i].date});
			}
			book.xlsx.writeFile("public/files/marinaden.xlsx").then(function(){
		 	 res.send({name:"http://localhost:3000/files/marinaden.xlsx"});
	 		});
    }

    });
	
    
	 
	

});

 

module.exports = router;