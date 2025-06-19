var express = require('express');

var app = express();
var server = require('http').Server(app);

app.get('/', function (req, res) {
    //res.send('Hello World!');
    res.sendFile(__dirname + '/client/index.html');
});
app.use('/client', express.static(__dirname + '/client'));

server.listen(3000);
console.log('Server is running on http://localhost:3000');

var SOCKET_LIST = []; //List of connected sockets
app.set('SOCKET_LIST', SOCKET_LIST); //Set the SOCKET_LIST in the app

var io = require('socket.io')(server, {});
io.sockets.on('connection', function (socket) {

    socket.id = socket.id; //Assign a unique ID to the socket
    socket.username = "User" + socket.id; //Assign a username based on the socket ID
    socket.x = 0;
    socket.y = 0;
    SOCKET_LIST[socket.id] = socket; //Add the socket to the SOCKET_LIST
    
    console.log('A user connected'); //Has connected
    console.log('Socket ID: via app.js is ' + socket.id); //Log the socket ID

    socket.on('disconnect', function () {
        console.log('A user disconnected');
    });

    socket.on('message', function (data) {
        console.log('Message received: ' + data);
        io.sockets.emit('message', data);
    });
});

setInterval(function () {
    for (var i in SOCKET_LIST) {
        var socket = SOCKET_LIST[i];
        socket.emit('newPositions', 
            console.log('Socket ID: via setInterval is ' + socket.id), //Log the socket ID
        );
        
    }
    
}   , 1000 / 25); //Send the positions of all sockets every 40ms (25 FPS)