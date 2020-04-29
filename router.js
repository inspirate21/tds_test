
var express = require('express'),
	app = express.Router();

module.exports = (function(){
	app.get('/', require(__dirname+"/controllers/index"));

	return app;
})();