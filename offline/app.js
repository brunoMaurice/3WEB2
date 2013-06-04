var http = require('http');
var socketio = require('socket.io');

// Variable Global
var chatData = [];

// Serveur HTTP
var server = http.createServer(function(request, response) {
    
}).listen(1337);

// Serveur Socket.io
var io = socketio.listen(server);

io.sockets.on('connection', function(socket) {
    console.log((new Date()) + 'Nouvelle user.');

    // On renvoi l'ensemble des messages au nouveau client
    if (chatData.length > 0) {
        socket.emit('history', chatData);
    }

    // Lorsqu'un utilisateur envoi un message
    socket.on('newMsg', function(message) {
        console.log((new Date()) + 'Message reçu : ' + message);
            
        // On garde l'ensemble des messages en mémoire (30 messages max)
        chatData.push(message);
        chatData = chatData.slice(-30);

        io.sockets.emit('message', message);
    });
})