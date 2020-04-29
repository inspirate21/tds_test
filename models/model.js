
module.exports.select = function (table, condition, param){
	var fields = "*";
	
	if(!condition){
		condition = {};
	}

	if(condition.fields){
		fields = condition.fields;
	}
	var query = "select "+fields+" from "+table;

	if(condition.join){
		query += " "+condition.join;
	}

	if(condition.where){
		query += " where "+condition.where;
	}

	if(condition.group){
		query += " group by "+condition.group;
	}

	if(condition.order){
		query += " order by "+condition.order;
	}

	if(condition.limit){
		query += " limit "+condition.limit;
	}

	if(condition.offset){
		query += " offset "+condition.offset;
	}
	if(condition.one){
		var result = db.one(query, param);
	}else{
		var result = db.query(query, param);	
	}

	if(condition.debug){
		console.log(query, param);
	}

	// console.log(query);
	// console.log(param);

	return result;
}

module.exports.query = function(query, param){
	return db.query(query, param);
}

module.exports.insert = function (table, data, primary){
	var fields = "";
	var values = "";
	var first = true;
	for(var field in data){
		if(!first){
			fields += ", ";
			values += ", ";
		}
		fields += field;
		values += "$("+field+")";

		first = false;
	}

	var query = "insert into "+table+" ("+fields+") values ("+values+")";
	if(primary){
		query += " returning "+primary;
		var result = db.one(query, data);
	}else{
		var result = db.none(query, data);	
	}

	return result;
}

module.exports.update = function(table, data, primary, condition){
	var query = "update "+table+" set ";
	var first = true;
	for(var field in data){
		if(field != primary){
			if (!first){
				query += ",";
				}
			first = false;
			query += field+"="+"$("+field+")";
		}
	}

	query += " where";

	if(condition){
		if(condition.where){
			query += " "+condition.where+" and";
		}	
	}
	
	first = true;
	for(var i in primary){
		if(!first){
			query+= " and";
		}
		query += " "+primary[i]+"=${"+primary[i]+"}";
		first = false;
	}

	var result = db.none(query, data);

	return result;
}

module.exports.updatePrimary = function(table, data, oldPrimary){
	var query = "update "+ table +" set ";

	var first = true;
	for(var field in data){
			if (!first){
				query += ",";
			}
			first = false;
			query += field + "=" + "'" + data[field] + "'";
	}

	query += ` where inv_id='${oldPrimary}'`;

	console.log(query)

	var result = db.none(query);

	return result;
}

module.exports.updateCustom = function(table, data, primary, primaryValue){
	var query = "update "+ table +" set ";

	var first = true;
	for(var field in data){
			if (!first){
				query += ",";
			}
			first = false;
			query += field + "=" + "'" + data[field] + "'";
	}

	query += ` where ` + primary + ` = '${primaryValue}'`;

	console.log(query)

	var result = db.none(query);

	return result;
}

module.exports.delete = function(table, data){
	var query = "delete from "+table+" where ";
	var first = true;
	for(var field in data){
		if(!first){
			query += " and ";
		}
		query += field+"=$("+field+")";
		first = false;
	}
	var result = db.none(query, data);

	return result;
}

module.exports.build_insert = function (table, data){
	var fields = "";
	var values = "";
	var first = true;
	for(var field in data){
		if(!first){
			fields += ", ";
			values += ", ";
		}
		fields += field;
		values += data[field];

		first = false;
	}

	var query = "insert into "+table+" ("+fields+") values ("+values+")";

	return query;
}

module.exports.build_update = function(table, data, primary){
	var query = "update "+table+" set ";
	var first = true;
	for(var field in data){
		if(field != primary){
			if (!first){
				query += ",";
				}
			first = false;
			query += field+"="+data[field];
		}
	}

	query += " where "+primary+"="+data[primary];

	return query;
}