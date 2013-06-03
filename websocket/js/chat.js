var url = "ws://localhost:1337";
var socket = new WebSocket(url, 'echo-protocol');

socket.onmessage=function(e) {
	var data = JSON.parse(e.data);

	switch(data.type) {
		case 'message' :
			postMessage(tplMsg(data.data));
			break;
		case 'history' :
			parseHistory(data.data);
			break;
	}
};

function parseHistory(data) {
	var length = data.length;

	for (var i = 0; i < length; i++) {
		postMessage(tplMsg(data[i]));
	}
}

function tplMsg(msg) {
	msg = JSON.parse(msg);

	var tpl = "<p>"+msg.message+"<br> écrit par @"+msg.pseudo+"</p>";

	return tpl;
}

self.onmessage = function (arg) {
	socket.send(JSON.stringify(arg.data));
}