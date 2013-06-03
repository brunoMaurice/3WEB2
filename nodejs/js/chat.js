var url = "http://localhost:1337";

var lastId = 0;

// Function spécial pour les web worker pour charger des script externe
importScripts(url);

setInterval(function(){
	importScripts(url);
}, 1000);

function parseJsonToHtml(msgs) {
	var length = msgs.length;

	if (length > 0) {
		var html = "";

		for (var i = 0; i < length; i++) {
			if (msgs[i].id <= lastId)
				continue;

			html += tplMsg(msgs[i]);

			lastId = msgs[i].id;
		}

		postMessage(html);
	}
}

function tplMsg(msg) {
	var tpl = "<p>"+msg.message+"<br> écrit par @"+msg.pseudo+"</p>";

	return tpl;
}


self.onmessage = function (arg) {
	var params = '?pseudo=' + arg.data.pseudo + '&message=' + arg.data.message;
	var sendUrl = url+'/post'+encodeURI(params);

	importScripts(sendUrl);

	lastId++;
	postMessage(tplMsg(arg.data));
}