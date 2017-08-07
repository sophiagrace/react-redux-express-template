const express = require('express');
const app = express();
const path = require('path');
const server = require('http').Server(app);
const io  = require('socket.io')(server);
const spawn = require('child_process').spawn;
// Example route
app.use(express.static(path.join(__dirname, '/build')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, './build/index.html'));
});

/* the following will change for different computers. */

const py = spawn('python', ['-u', 'home/pi/Public/web-smart-mirror/rpi-arm-raspbian-8.0-1.2.0/demo.py'],{
  stdio: ['pipe', 'pipe', 'ignore'],
  cwd: '/home/pi/Public/web-smart-mirror/rpi-arm-raspbian-8.0-1.2.0'
})

/* the following will change for different computers. */

const readline = require('readline');
const rl = readline.createInterface({
  input: py.stdout,
  output: 'ignore'
});


io.on('connection', function(socket){
	console.log("connected to sockets");

  rl.on('line', hotword => {
    console.log("hotword detected", hotword);
    if(hotword === 'snowboy'){
      console.log("snowboy deteced");
      socket.emit('active');
    } else {
      console.log("widget was heard");
      socket.emit('widget', hotword);
    }
  });

})

server.listen(3000, function() {
    console.log('server running on port 3000!');
});
