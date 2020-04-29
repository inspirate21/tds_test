var status = null,
	message = null,
	data = null;

module.exports.success = function(res, data, message){
	return res.status(200).send({status: 200, message: message, result: data});
}

module.exports.render = function(res, template, parameter){
	return res.render("public/print/"+template, parameter);
}

module.exports.error = function(res, type, err){
	switch(type){

		case "miss_param":
			statusCode = 400;
			error = "Bad Request";
			message = "Invalid request payload JSON format";
			break;

		default:
			statusCode = 500;
			error = "Error";
			message = "Kesalahan pada koneksi server";
			break;
	}

	if(err){
		console.log(err);
	}

	return res.status(statusCode).send({statusCode: statusCode, error: error, message: message});
}