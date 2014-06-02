define([
    'socketio'
    ],
    function(io) {
        var socket = io.connect('http://agnystudio.noip.me:8080');
        var init = function() {
            socket.on('all-status', function (data) {
                console.log(data);
            });
            socket.on('error', function (data) {
                console.log(data);
            });
            socket.on('update-user', function (data) {
                console.log(data);
            });
        };

        return {
            init: init
        }
    }
);