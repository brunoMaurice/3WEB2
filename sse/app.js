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

		res.end();
	} else if (req.headers.accept && req.headers.accept == 'text/event-stream') {
		sendSSE(req, res);
	} else {
		res.writeHead(200, { 'Content-Type': 'application/javascript' });

		res.write('parseJsonToHtml(');
		res.write(JSON.stringify(chatData));
		res.write(');');

		res.end();
	}
}).listen(1337);

function sendSSE(req, res) {
	res.writeHead(200, {
		'Content-Type': 'text/event-stream',
		'Cache-Control': 'no-cache',
		'Connection': 'keep-alive',
		'Access-Control-Allow-Origin': '*'
	});

	var id = (new Date()).toLocaleTimeString();
	var lastLength = chatData.length;

	setInterval(function() {
		var length = chatData.length;

		if (length > lastLength) {
			var newData = [];

			for (var i = lastLength; i < length; i++) {
				newData.push(chatData[i]);

				lastId = chatData[i].id;
			}

			lastLength = length;

			if (newData.length > 0)
				constructSSE(res, id, JSON.stringify(newData));
		}
	}, 1000);

	if (chatData.length > 0)
		constructSSE(res, id, JSON.stringify(chatData));
}

function constructSSE(res, id, data) {
	res.write('id: ' + id + '\n');
	res.write("data: " + data + '\n\n');
}