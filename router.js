
var express = require('express'),
	app = express.Router();

module.exports = (function(){
	app.get('/', require(__dirname+"/controllers/index"));

	app.get("/repo/public", require(__dirname+"/controllers/repo")._publicRepo);

	return app;
})();