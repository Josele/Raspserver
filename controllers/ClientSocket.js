var net = require('net');

exports.question=function(req,res){
res.render('commandview');



};



exports.answer=function(req,res){ // req will have the command from out


if(req.query.comando.length>0){
var str = req.query.comando;
var client = new net.Socket();




client.connect(45000, '127.0.0.1', function() {
	console.log('S: Connected');
	client.write(str);
	client.end(); // esto es importante, sino el servidor espera más datos
	if(str=='quit')
            throw new Error('close de server after quit');
});

client.on('error',function(e){
	console.log(e);
	client.end();

 
  // Throw error. Follows net_legacy behaviour.
  //  throw new Error(e);
});



client.on('data', function(data) {
        console.log('Received: '+  data);
	res.render('show',{respuesta: data});
        client.end(); // kill gently the client after the second server's response
	
});

client.on('end', function() {
        console.log('S: Connection closed');
});

}else  //at here we handle a null command, the program in c isn't prepared for this.
//res.send('Null command');
 res.render('show',{respuesta: 'Null command'});
};
