var net = require('net');
var str ="quiqt";
var client = new net.Socket();
var cuenta = 0;

client.connect(45000, '127.0.0.1', function() {

	console.log('Connected');
	client.write(str);
	client.end();
});

client.on('data', function(data) {
	console.log('Received: ' + data);
	
	
	client.destroy(); // kill client after server's response
	
});

client.on('close', function() {
	console.log('Connection closed');
});




