var net = require('net');

exports.question=function(req,res){
res.render('commandview');



};



exports.answer=function(req,res){ // req will have the command from out


if(req.query.comando.length>0){
var str = req.query.comando;
var client = new net.Socket();

client.connect(45000, '127.0.0.1', function() {
	console.log('Connected');
	client.write(String.fromCharCode(str.length));
});
client.on('data', function(data) {
	console.log('Received: ' + data);
	client.write(str);
	res.send('Received: '+ data);
	client.destroy(); // kill client after server's response
});

client.on('close', function() {
	console.log('Connection closed');
});}
else
res.send('Null command');

};
