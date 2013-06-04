window.onload = function() {
	var chats = document.getElementById('chats');
	chats.innerHTML = '';

	var url = "http://localhost:1337";

	var chatData = (localStorage["messages"] !== undefined) ? JSON.parse(localStorage["messages"]) :  [];
	var offline = (localStorage["offline"] !== undefined) ? JSON.parse(localStorage["offline"]) : [];

	if (window.io) {
		var socket = io.connect(url);

		socket.on('message', function(data) {
			showMessage(data);
		});

		socket.on('history', function(data) {
			parseMessage(data);
		});

		if (window.localStorage) {
			var length = offline.length;

			for (var i = 0; i < length; i++) {
				sendMessage(offline[i]);
			}

			localStorage.removeItem('offline');
			offline = [];
		}
	} else if (window.localStorage) {
		parseMessage(chatData);

		parseMessage(offline);
	}

	function parseMessage(data) {
		var length = data.length;

		for (var i = 0; i < length; i++) {
			showMessage(data[i]);
		}
	}

	function showMessage(msg) {
		if (window.io) {
			chatData.push(msg);
			chatData = chatData.slice(-30);

			if (window.localStorage) {
				localStorage["messages"] = JSON.stringify(chatData);
			}
		}

		postMessage(tplMsg(msg));
	}

	function tplMsg(msg) {
		var tpl = "<p>"+msg.message+"<br> écrit par @"+msg.pseudo+"</p>";

		return tpl;
	}

	function postMessage(msg) {
		chats.innerHTML = chats.innerHTML + msg;

		chats.scrollTop = chats.scrollHeight;
	}

	function sendMessage(msg) {
		if (window.io) {
			socket.emit('newMsg', msg);
		}
	}

	document.getElementById('send').onclick = function(event) {
		var pseudo = document.querySelector('input[name="pseudo"]').value;
		var message = document.querySelector('input[name="message"]').value;

		var data = {'pseudo' : pseudo, 'message' : message};

		if (window.io) {
			sendMessage(data);
		} else if (window.localStorage) {
			offline.push(data)
			localStorage["offline"] = JSON.stringify(offline);

			showMessage(data);
		}

		document.querySelector('input[name="message"]').value = '';
	}
}