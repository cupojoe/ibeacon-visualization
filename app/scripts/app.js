define([
    'socketio', 'Beacon', 'particles'
    ],
    function(io, Beacon, particles) {
        var socket = io.connect('http://agnystudio.noip.me:8080');
        //var socket = io.connect('http://10.0.1.3:8080');
        var beacon;
        var init = function() {
            beacon = new Beacon();

            socket.on('all-status', function (data) {
                for (var i=0; i<data.length; i++) {
                    var u = data[i];
                    if (u.state === 'CLRegionStateInside') {
                        beacon.addUserOnce({id: u._id, name: u.username, practice: 'FED'});
                    }
                }
            });
            socket.on('error', function (data) {
                console.log(data);
            });
            socket.on('update-user', function (data) {
                if (data.state === 'CLRegionStateInside') {
                    beacon.addUserOnce({id: data._id, name: data.username, practice: 'FED'});
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