var net = require('net');
async = require("async");

exports.question=function(req,res){
res.render('prtlsviews/commandview');



};


exports.answer=function(req,res){ // req will have the command from out


if(req.query.comando.length>0){
var str = req.query.comando;
var client = new net.Socket();
var data_send;
async.series([
        //Load user to get userId first
        function(callback) {

client.connect({path: '/home/pi/LselRemasterizado/socket'}, function() {
	console.log('Server: Connected and send command');
	client.write(str);
	client.end(); // esto es importante, sino el servidor espera más datos
	if(str=='quit')
            throw new Error('close de server after quit');
});
client.setTimeout(2000,function () {
client.destroy();
});
client.on('error',function(e){
	console.log(e);
	client.end();

 
  // Throw error. Follows net_legacy behaviour.
  //  throw new Error(e);
});



client.on('data', function(data) {
        console.log('Received: '+  data);
	//	res.render('prtlsviews/show',{respuesta: data});
        data_send=data;
	client.end(); // kill gently the client after the second server's response
	
});

client.on('end', function() {
        console.log('S: Connection closed');
callback();
});
}], function(err) { //This function gets called after the two tasks have called their "task callbacks"
        if (err) return next(err);
        //Here locals will be populated with 'user' and 'posts'
        res.render('prtlsviews/show',{respuesta: data_send});
    });
}else  //at here we handle a null command, the program in c isn't prepared for this.
//res.send('Null command');
 res.render('prtlsviews/show',{respuesta: 'Null command'});
};


exports.answer_android=function(req,res){ // req will have the command from out


if(req.query.comando.length>0){
var str = req.query.comando;
var client = new net.Socket();




client.connect({path: '/home/pi/LselRemasterizado/socket'}, function() {
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
        res.send(data.toString());
        client.end(); // kill gently the client after the second server's response

});

client.on('end', function() {
        console.log('S: Connection closed');
});

}else  //at here we handle a null command, the program in c isn't prepared for this.
res.send('Null command');
// res.render('prtlsviews/show',{respuesta: 'Null command'});
};

