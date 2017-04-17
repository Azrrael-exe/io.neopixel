var io = require('socket.io')();
var redis = require("redis");
var client = redis.createClient();
io.serveClient(false);

io.on('connection', function(socket){
  socket.on('payload', function(msg){
    console.log(JSON.stringify(msg))
  });
  socket.on('register', function(msg){
    console.log(msg)
    client.set(msg["socketName"], msg['socketId'])
  });
  socket.on('user-command', function(msg){
    client.get(msg['socketName'], function(err, response){
      if(response == null){
        io.to(socket.id).emit('response', {
          status : "Device Not found"
        })
      }
      else{
        io.to(response).emit('device-command', msg['payload']);
        io.to(socket.id).emit('response', {
          status : "Device Not found"
        })
      }
    })
  })
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

module.exports = io
