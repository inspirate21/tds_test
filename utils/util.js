let $model = require(__dirname+"/../models/model")
	moment = require("moment");

module.exports.checkParameters = function(data){
	for(let i in data){
		if(!data[i] && data[i] !== null && data[i] !== 0 && data[i]===undefined && data[i]!= ""){
			console.log(i);
			return false;
		}
	}
	return true;
}

module.exports.dateFormat = function(date, reverse){
	moment.locale('id');
	let format = "DD-MM-YYYY";
	if(reverse){
		format = "YYYY-MM-DD";
	}

	if(date){
		return moment(date).format(format);	
	}else{
		return null;
	}
}