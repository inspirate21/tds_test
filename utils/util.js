var $model = require(__dirname+"/../models/model");

module.exports.checkParameters = function(data){
	for(var i in data){
		if(!data[i] && data[i] !== null && data[i] !== 0 && data[i]===undefined && data[i]!= ""){
			console.log(i);
			return false;
		}
	}
	return true;
}