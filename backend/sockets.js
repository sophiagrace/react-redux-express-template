// FILE WITH CODE FOR SOCKETS
const spawn = require('child_process').spawn;
const { localGetCommand } = require('./processHuman');

/* ***** HOTWORD -- LOCAL CODE ***** */
// the following will change for different computers.
const myFilePath = '/Users/amandahansen/SmartMirror/';
const fp1 = myFilePath +'web-smart-mirror/rpi-arm-raspbian-8.0-1.2.0/demo.py';
const fp2 = myFilePath + 'web-smart-mirror/rpi-arm-raspbian-8.0-1.2.0';

const py = spawn('python', ['-u', fp1],{
  stdio: ['pipe', 'pipe', 'ignore'],
  cwd: fp2
})
// the above will change for different computers.
const readline = require('readline');
const rl = readline.createInterface({
  input: py.stdout,
  output: 'ignore'
});

/* ***** STT -- LOCAL CODE ***** */
// getCommand('testwidget').then(respObj => {
//   console.log('finished get command');
//   console.log('got this info:', respObj);
// })

function getCommand (widgetName, socket, io) {
  console.log('reached {A}')
  return localGetCommand(widgetName)
    .then( respObj => {
      console.log('reached {B}')

      if (respObj.notFinished) {
        console.log('reached {C}', respObj)
        // cycle incomplete, send new prompt to container
        io.to('W_CONTAINER').emit('stt_continuing', respObj );

        return getCommand(widgetName, socket, io)
        // return setTimeout(() => {return getCommand(widgetName)}, 1000);
      } else {
        console.log('reached {D}');
        // completed cycle, send to container & widget
        io.emit('stt_finished', respObj);
        return respObj;
      }
    })
    .catch( err => {
      console.log('encountered error :(', err);
    });
}

/* ***** SOCKETS LISTENERS ***** */
module.exports = function (io) {
  io.on('connection', function(socket){
    // socket listener for Hot Word
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

    socket.room = 'DEFAULT';
    // socket listeners for STT
    socket.on('stt', widgetName => {
      console.log('in stt', widgetName);
      socket.room = widgetName;
      getCommand(widgetName, socket, io);
    });

  });
}
