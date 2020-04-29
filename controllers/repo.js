let response = require(__dirname+"/../utils/response"),
	util = require(__dirname+"/../utils/util")
  https = require('https');


module.exports._publicRepo = function(req, res, next){

  let param = {
    username : req.query.username ? req.query.username : null
  }

  let options = {
      host: 'api.github.com',
      path: '/users/' + param.username + '/repos',
      method: 'GET',
      headers: {'user-agent': 'node.js'}
  };

  var request = https.request(options, (result) => {
      let data = '';

      result.on('data', (chunk) => {
          data += chunk;
      });

      result.on('end', () => {

        let parseData = JSON.parse(data);

        var output = {
          data : []
        }

        for(let i in parseData){

          output.data.push({
            repo_name : parseData[i].name,
            private : parseData[i].private,
            owner : parseData[i].owner.login,
            description : parseData[i].description,
            language : parseData[i].language,
            created_at : parseData[i].created_at,
            updated_at : parseData[i].updated_at,
            language : parseData[i].language
          });
        }

        return response.success(res, output, "success");
      });

  }).on("error", (err) => {
      console.log("Error: ", err.message);
      return response.error(res, null, err);
  });

  request.end();
}