var url = "http://localhost:1337";

importScripts(url+"/socket.io/socket.io.js");

var socket = io.connect(url);

socket.on('message', function(data) {
	postMessage(tplMsg(data));
});

socket.on('history', function(data) {
	var length = data.length;

	for (var i = 0; i < length; i++) {
		postMessage(tplMsg(data[i]));
	}
});

function tplMsg(msg) {
	var tpl = "<p>"+msg.message+"<br> écrit par @"+msg.pseudo+"</p>";

	return tpl;
}

self.onmessage = function (arg) {
	socket.emit('newMsg', arg.data);
}