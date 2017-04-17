var app = angular.module("io-pixel", ['btford.socket-io']);

app.factory('socket', function (socketFactory) {
  var myIoSocket = io.connect('http://localhost:8080');
  mySocket = socketFactory({
    ioSocket: myIoSocket
  });
  return mySocket;
});

app.controller("user-control", function($scope, socket) {

  function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
  }

  socket.on('response', function(msg) {
    $scope.status = msg.status
  })

  $scope.sendColor = function(soc ,col){
    console.log(hexToRgb(col))
    socket.emit('user-command', {
      socketName: soc,
      payload: hexToRgb(col)
    })
  }
})
