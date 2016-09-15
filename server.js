var http = require('http'),
    fs = require('fs'),
    exec = require("child_process").exec;
    index = fs.readFileSync(__dirname + '/index.html');


var app = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
});


var io = require('socket.io').listen(app);


function sendTime(m) {
    io.emit('time', { time: m });
}


//setInterval(sendTime, 10000);


io.on('connection', function(socket) {
    
    socket.emit('welcome', { message: 'Welcome!', id: socket.id });

    socket.on('i am client', console.log);
    socket.on('deploy', function(){
         console.log('got deploy'); 
         exec('sh ./deploy.sh', function (err, stdout, stderr) {
         if (err) console.log(err);

         console.log(stdout);
         console.log(stderr);
         sendTime(stdout);
         //response.write(stdout);
         //response.end();
                          
    
    });
    });
});

app.listen(49152);


