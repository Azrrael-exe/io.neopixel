var io = require('socket.io')();
var redis = require("redis");
var client = redis.createClient( null || process.env.REDIS_URL);
io.serveClient(false);
io.on('connection', function(socket){
  socket.on('register', function(msg){
    console.log(msg)
    client.set(msg["socketName"], msg['socketId'])
    client.expire(msg["socketName"], 7200);
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
          status : "Message Sended"
        })
      }
    })
  })
  socket.on('disconnect', function(){
    console.log({'user disconnected': socket.id});
  });
});

module.exports = io
