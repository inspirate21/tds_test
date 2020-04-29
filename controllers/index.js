var response = require(__dirname+"/../utils/response");

module.exports = function(req, res, next){
	return response.success(res);
}