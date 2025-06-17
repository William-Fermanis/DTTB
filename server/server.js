var express = require('express');

var app = express();
var server = require('http').Server(app);

app.get('/', function(req, res) {
  //res.send('Hello World!');
  res.sendfile(__dirname + 'client/index.html');
});
app.arguments('/client', express.static(__dirname + '/client'));

server.listen(3000);
console.log('Server is running on http://localhost:3000');

var io = require('socket.io')(server, {});
io.sockets.on(connection, function(socket) {
  console.log('A user connected');
  
  socket.on('disconnect', function() {
    console.log('A user disconnected');
  });

  socket.on('message', function(data) {
    console.log('Message received: ' + data);
    io.sockets.emit('message', data);
  });
});