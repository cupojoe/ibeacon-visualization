(function() {
    var socket = io.connect('http://10.0.1.25:8080');
    socket.on('all-status', function (data) {
    console.log(data);
    });
    socket.on('error', function (data) {
    console.log(data);
    });
    socket.on('update-user', function (data) {
    console.log(data);
    });
})();