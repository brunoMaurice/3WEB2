var http = require('http'),
	url = require('url');

var chatData = [];

http.createServer( function(req, res) {
	var postUrl = new RegExp("^/post\\?+((\\w*=.*)(&(\\w*=.*))*)$", "g");

	if (postUrl.test(req.url)) {
		var url_parts = url.parse(req.url, true);

		var query = url_parts.query;
		query.id = (chatData[chatData.length-1] != undefined) ? chatData[chatData.length-1].id+1 : 0;

		var nbData = chatData.push(query);

		if (nbData == 30)
			chatData.shift();

		console.log('#'+query.id+' '+query.pseudo+'say : '+query.message);
	} else {
		res.writeHead(200, { 'Content-Type': 'application/javascript' });
   
		res.write('parseJsonToHtml(');
		res.write(JSON.stringify(chatData));
		res.write(');');
	}

   res.end();
}).listen(1337);

console.log('Server running on port 1337');