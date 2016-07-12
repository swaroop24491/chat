$(function(){
	var socket = io();
	$('form').on('submit', function(e){
		e.preventDefault();
		socket.emit('chat message', window.name + " says: " + $('#m').val());
		$('#m').val('');
		return false;
	});
	socket.on('chat message', function(msg){
		$('#messages').append($('<li>').text(msg));
	});
	
})

