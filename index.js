var express = require('express');
var app = express();

var http = require('http');
var server = http.createServer(app);
var io = require('socket.io')(server);

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.post('/chat', function(req, res){
  var user_name = req.body.name;
  console.log(user_name);
  res.render('chat', { name: user_name});
});

io.on('connection', function(socket){
  socket.on('chat message', function(obj){
  	console.log("Received chat msg" + obj.message);
    io.emit('chat message', obj);
  });
});

server.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:xxxx');
});
