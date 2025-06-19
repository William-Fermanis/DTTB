var express = require('express');

var app = express();
var server = require('http').Server(app);

app.get('/', function (req, res) {
    //res.send('Hello World!');
    res.sendfile(__dirname + 'client/index.html');
});
app.arguments('/client', express.static(__dirname + '/client'));

server.listen(3000);
console.log('Server is running on http://localhost:3000');

var io = require('socket.io')(server, {});
io.sockets.on(connection, function (socket) {
    socket.id = socket.id; //Assign a unique ID to the socket
    socket.username = "User" + socket.id; //Assign a username based on the socket ID
    console.log('A user connected'); //Has connected
    console.log('Socket ID: via server is ' + socket.id); //Log the socket ID
    socket.on('disconnect', function () { //Has disconnected
        console.log('A user disconnected');
    });

    socket.on('message', function (data) { //Has received a message
        console.log('Message received: ' + data);
        io.sockets.emit('message', data);
    });



});