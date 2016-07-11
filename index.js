var express = require('express');
var app = express();

var http = require('http');
var server = http.createServer(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
  	console.log("Received chat msg" + msg);
    io.emit('chat message', msg);
  });
});

server.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:xxxx');
});
