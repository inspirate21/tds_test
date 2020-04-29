var	express = require('express'),
	fs = require('fs'),
	app = express();

module.exports = function(req, res, next){
	var config = {
		title : "API Documentations",
		api : JSON.parse(fs.readFileSync(__dirname+"/api.json", 'utf8'))
	}

	var api = {};

	res.render('docs/views/docs', {config : config});
}