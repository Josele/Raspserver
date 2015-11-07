var net = require('net');
var str ="quit";
var client = new net.Socket();
var cuenta = 0;

client.connect(45000, '127.0.0.1', function() {

	console.log('Connected');
	client.write(String.fromCharCode(str.length));
});

client.on('data', function(data) {
	console.log('Received: ' + data);
	client.write(str);
	if(cuenta>1)
	client.destroy(); // kill client after server's response
	cuenta++;
});

client.on('close', function() {
	console.log('Connection closed');
});




