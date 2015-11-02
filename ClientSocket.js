var net = require('net');
var str ="Hello, Im";

var client = new net.Socket();
client.connect(45000, '127.0.0.1', function() {

	console.log('Connected');
	client.write(String.fromCharCode(str.length));
});

client.on('data', function(data) {
	console.log('Received: ' + data);
client.write(str);

	client.destroy(); // kill client after server's response
});

client.on('close', function() {
	console.log('Connection closed');
});
