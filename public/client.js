$(function(){
	var socket = io();
	$('form').on('submit', function(e){
		e.preventDefault();
		var obj = {};
		obj.name = window.name;
		obj.message = $('#m').val();
		socket.emit('chat message', obj);
		$('#m').val('');
		return false;
	});
	socket.on('chat message', function(obj){
		if(obj.name != window.name){
			$('#messages').append($('<li>').text(obj.name + " says: " + obj.message));
		}else{
			$('#messages').append($('<li style="color:green">').text("you: " + obj.message));
		}
	});
	
})

