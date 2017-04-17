var io = require("socket.io-client")
var socket = io('http://localhost:8080');
// var SerialPort = require('serialport');
// var port = new SerialPort('COM3',{
//   baudrate : 115200
// });
//
// port.on('open', function(){
//   console.log("SerialPort open!")
// });

socket.on('connect', function(){
  console.log(socket.id);
  socket.emit('register', {
    socketName : 'SocketTest',
    socketId : socket.id
  })
  socket.emit('user-command', {
    socketName : 'SocketTest',
    payload : {
      red : 100,
      green : 0,
      blue : 100
    }
  })
});

socket.on('device-command', function(msg){
  // port.write('main screen turn on', function(err){});
  console.log(msg)
})
