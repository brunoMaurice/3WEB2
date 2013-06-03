var webSocketServer = require('websocket').server,
    http = require('http');

// Variable Global
var chatData = [];
var clients = [];

// Serveur HTTP
var server = http.createServer(function(request, response) {
	// Rien d'important ici pour nous vue que tout sera en websocket et non en HTTP
}).listen(1337);

// Serveur WebSocket
var wsServer = new webSocketServer({
    httpServer: server
});

// Function de callback appele à chaque connexion de type websocket
wsServer.on('request', function(request) {
    // Pour plus de sécurité voir : http://en.wikipedia.org/wiki/Same_origin_policy
    var connection = request.accept(null, request.origin); 

    // On a besoin de savoir l'index du client afin de le supprimer lors de sa deconnexion
    var index = clients.push(connection) - 1;

    console.log((new Date()) + 'Nouvelle user.');

    // On renvoi l'ensemble des messages au nouveau client
    if (chatData.length > 0) {
        connection.sendUTF(JSON.stringify( { type: 'history', data: chatData} ));
    }

    // Lorsqu'un utilisateur envoi un message
    connection.on('message', function(message) {
        if (message.type === 'utf8') { // accept only text
			console.log((new Date()) + 'Message reçu : ' + message.utf8Data);
            
            // On garde l'ensemble des messages en mémoire (30 messages max)
            chatData.push(message.utf8Data);
            chatData = chatData.slice(-30);

            // On broadcast le message à tout les clients
            var json = JSON.stringify({ type:'message', data:  message.utf8Data });
            for (var i=0; i < clients.length; i++) {
                clients[i].sendUTF(json);
            }
        }
    });

    // Event de deconnexion d'un utilisateur
    connection.on('close', function(connection) {
    	console.log((new Date()) + 'User deconnexion');

    	clients.splice(index, 1);
    });

});