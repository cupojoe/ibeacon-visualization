define([
    'socketio', 'Beacon', 'particles', 'practices'
    ],
    function(io, Beacon, particles, practices) {
        //var server = 'http://agnystudio.noip.me:8080';
        var server = 'http://ec2-54-200-253-132.us-west-2.compute.amazonaws.com:8080';
        var socket = io.connect(server);
        //var socket = io.connect('http://10.0.1.3:8080');
        var beacon;
        var init = function() {
            beacon = new Beacon();
            practices.getPractices(bindSocket);
        };

        function bindSocket(practiceResults) {
            socket.on('all-status', function (data) {
                for (var i=0; i<data.length; i++) {
                    var u = data[i];
                    if (u.state === 'enter') {
                        beacon.addUserOnce({id: u._id, name: u.username, practice: u.practice});
                    }
                }
            });
            socket.on('error', function (data) {
                console.log(data);
            });
            socket.on('update-user', function (data) {
                if (data.state === 'enter') {
                    beacon.addUserOnce({id: data._id, name: data.username, practice: data.practice});
                } else {
                    beacon.removeUser({id: data._id});
                }
            });

            beacon.loadTestMenu();
            particles.init();
        };



        return {
            init: init,
            getBeacon: function () {
                return beacon;
            }
        }
    }
);