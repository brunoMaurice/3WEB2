var url = "http://localhost:1337";
var source = new EventSource(url);

source.onmessage=function(event) {
	var msgs = JSON.parse(event.data);
	var length = msgs.length;

	if (length > 0) {
		var html = "";

		for (var i = 0; i < length; i++) {
			html += tplMsg(msgs[i]);
		}

		postMessage(html);
	}
};

function tplMsg(msg) {
	var tpl = "<p>"+msg.message+"<br> écrit par @"+msg.pseudo+"</p>";

	return tpl;
}

self.onmessage = function (arg) {
	var params = '?pseudo=' + arg.data.pseudo + '&message=' + arg.data.message;
	var sendUrl = url+'/post'+encodeURI(params);

	importScripts(sendUrl);
}