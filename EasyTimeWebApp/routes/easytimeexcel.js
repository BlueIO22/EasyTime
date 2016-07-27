var express = require('express');
var router = express.Router();
var hogan = require('hogan.js');
var sessions = require('express-session');
var bodyParser = require('Body-Parser');
var cookieParser = require('Cookie-Parser');
var fs = require('fs');
var mysql = require('mysql');
var app = express();
var server = require('http').Server(app);
var Excel = require('exceljs');

	router.get('/', function(req, res){
		var obj = readJSONFile('public/jsonlib/design.json');
		res.render('easytimeexcel', obj.program);
	});
		
	function readJSONFile(filepath){
		var file = fs.readFileSync(filepath, 'utf-8');
		return JSON.parse(file);

	}


module.exports = router;