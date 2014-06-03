define([
    'socketio', 'Beacon', 'User'
    ],
    function(io, Beacon, User) {
        var socket = io.connect('http://agnystudio.noip.me:8080');
        var beacon;
        var init = function() {
            beacon = new Beacon();

            socket.on('all-status', function (data) {
                for (var i=0; i<data.length; i++) {
                    var u = data[i];
                    if (u.state === 'CLRegionStateInside') {
                        beacon.addUser(new User({id: u._id, name: u.username, practice: 'FED'}));
                    }
                }
            });
            socket.on('error', function (data) {
                console.log(data);
            });
            socket.on('update-user', function (data) {
                console.log(data);
                if (data.state === 'CLRegionStateInside') {
                    beacon.addUser(new User({id: data._id, name: data.username, practice: 'FED'}));
                } else {
                    beacon.removeUser(new User({id: data._id}));
                }
            });


            // bc.addUser(new User({'id': '1', 'name': 'Test', 'practice': 'FED'}));
            // bc.removeUser({ 'id': '1' });

            beacon.loadTestMenu();
        };

        return {
            init: init
        }
    }
);