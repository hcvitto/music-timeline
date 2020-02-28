var express = require('express');
var app = express();
var http = require('http');
var socket = require("socket.io");

var server = http.createServer(app);
var io = socket.listen(server);

app.get('/', function(req, res) {
  res.send("<h1>Hello world</h1>");
});

io.on('connection', function(socket) {
  socket.on("from client", function(data) {
    io.emit("from server", data);
  });  
});

server.listen(3000, function() {
  console.log('listening on *:3000');
});