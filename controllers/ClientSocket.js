var net = require('net');

exports.question=function(req,res){
res.render('commandview');



};



exports.answer=function(req,res){ // req will have the command from out


if(req.query.comando.length>0){
var str = req.query.comando;
var client = new net.Socket();
var cuenta =0;
client.connect(45000, '127.0.0.1', function() {
	console.log('Connected');
	client.write(String.fromCharCode(str.length));
});

client.on('error',function(e){

console.log("One error: "+ e+"\n El error ECONNRESET viene dado por cerrar abruptamente el otro socket");
client.end(); 

});



client.on('data', function(data) {
        console.log('Received: ' + data);
        client.write(str);
        if(cuenta>1){
	res.send('Received: '+ data);
        client.end(); // kill gently the client after the second server's response
	}
	cuenta++;
});

client.on('end', function() {
        console.log('Connection closed');
	cuenta=0;
});

}else  //at here we handle a null command, the program in c isn't prepared for this.
res.send('Null command');
};
