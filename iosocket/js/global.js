window.onload = function() {
	var chatWorker = new Worker('js/chat.js');
	var chats = document.getElementById('chats');

	chatWorker.onmessage = function(arg) {
		chats.innerHTML = chats.innerHTML + arg.data;

		chats.scrollTop = chats.scrollHeight;
	}

	document.getElementById('send').onclick = function(event) {
		var pseudo = document.querySelector('input[name="pseudo"]').value;
		var message = document.querySelector('input[name="message"]').value;

		chatWorker.postMessage({'pseudo' : pseudo, 'message' : message});

		document.querySelector('input[name="message"]').value = '';
	}
}