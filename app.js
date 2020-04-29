
var express = require('express'),
	app = express(),
	http = require('http'),
	passport = require('passport'),
	pg = require('pg-promise')({promiseLib: require('q')}),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	server = http.createServer(app),
	environment = require(__dirname+"/constant"),
	pgConfig = require(__dirname+'/configs/postgre'),
	exphbs = require('express-handlebars'),

	cons = require('consolidate');

global.env = environment();
global.$constant = require(__dirname+"/configs/server")[env];
global.$rootPath = __dirname;

app.engine('ejs', cons.ejs);
app.engine('handlebars', cons.handlebars);

app.set('view engine', 'handlebars');
app.set('views', __dirname);
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true, limit: '50mb', parameterLimit: 1000000}));

app.use(function(req, res, next){
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');

	return next();
});
global.db = pg(pgConfig[env]);

if(env != "production"){
	app.use('/docs', express.static(__dirname+"/docs"));
	app.use(express.static(__dirname+"/docs"));
	
	app.get("/api-docs", require(__dirname+"/docs/docs"));
}


app.use(require(__dirname+"/router"));

app.get("/*", function(req, res, next){
	res.status(404).send({status: 404, message: 'This URL may be deleted or not exist in this server'});
});

server.listen($constant.port, function(){
	console.log('HTTP Server started on localhost port '+$constant.port);
});