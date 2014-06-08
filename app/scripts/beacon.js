/*
	Author: 		Gary Kuo
	Date: 			May 28, 2014
	Description: 	Beacon object sets up the board where Beacon will be displayed and loads up the individual bulbs. TODO: Canvas behind the board.

*/

define([
	'jquery',
	'Lightbulb',
	'User',
	'particles'
	],
	function ($, Lightbulb, User, particles) {
		var CONSTANTS = { bcwidth: 5100, bcheight: 3300 };

		var Beacon = function( callback ) {
			var bc = $('#beacon'),
				lightbulbs = $('.lightbulb'),
				users = $('#users ul'),
				usersList = users.find('li'),
				usersShown = 0,
				userCollection = new Array();

			var init = function() {
				loadBulbs( lightbulbs, 0, function() {
					setTimeout(function() {
						//bc.removeClass('init');
						bc.addClass('fadein');
					}, 500);

					if ( typeof callback === 'function' ) {
						callback();
					}
				} );
			};

			// recursively load each bulb from the PSD file
			// with the correct width and height and X/Y pos
			var loadBulbs = function( lightbulbs, i, callback ) {
				if ( i < lightbulbs.length ) {

					$('#' + lightbulbs[i].id).one('load', function() {
						var bulb = new Lightbulb();
						var id = $(this).attr('id'),
							x = $(this).data('x'),
							y = $(this).data('y'),
							w = $(this).width(),
							h = $(this).height(),
							percW = (w / CONSTANTS.bcwidth) * 100,
							percH = (h / CONSTANTS.bcheight) * 100,
							percX = (x / CONSTANTS.bcwidth) * 100,
							percY = (y / CONSTANTS.bcheight) * 100;

						bc.append('<img id="' + id + '-duplicate" src="' + $(this).attr('src') + '" alt="" style="width: ' + percW + '%; left: ' + percX + '%; top: ' + percY + '%;" class="lightbulb duplicate ring-' + $(this).data('ring') + '" />');
						bulb.set(id, x, y, w, h, percW, percH, percX, percY, $(this));
						bulb.load();

						//bulb.enableFlicker();

						loadBulbs(lightbulbs, i+1, callback);
					}).each(function() {
						if (this.complete) {
							$(this).load();
						}
					});
				}

				// what should we do after all the bulbs is displayed?
				else if ( i >= lightbulbs.length && typeof callback == 'function' ) {
					callback();
				}
			};

			init();

			//**
			// * Below are functions for adding/removing users.
			//**

			var addUser = function( user ) {
				users.append( '<li id="user-' + user.id + '"><p>' + user.name + '</p><img src="images/user.png" alt="" /></li>' );
				(function() {
					var uid = usersShown;
					setTimeout(function() {
						$('#user-' + user.id).addClass('rot_'+uid);
					}, 100);
				})();
				usersShown++;
			};

			this.addUserOnce = function(userData) {
				if (indexOfUser(userData) === -1) {
					userData.emitter = particles.createEmitter(userCollection.length);
					var u = new User(userData);
					userCollection.push(u);
					addUser(u);
				}
			};

			this.removeUser = function(userData) {
				var index = indexOfUser(userData);
				if (index > -1) {
					var userToBeRemoved = $('#user-' + userData.id);
					// remove user
					userToBeRemoved.remove();
					var u = userCollection.splice(index, 1)[0];
					particles.removeEmitter(u.emitter);
					usersShown--;
					adjustRotations();
				}
			};

			var adjustRotations = function() {
				for (var i=0; i<userCollection.length; i++) {
					var u = userCollection[i];
					particles.updateEmitterPos(u.emitter, i);
					var $u = $('#user-' + u.id);
					$u.removeAttr('class');
					$u.addClass('rot_' + i);
				}
			};

			var indexOfUser = function(user) {
				for (var i=0; i<userCollection.length; i++) {
					if (userCollection[i].id === user.id) {
						return i;
					}
				}
				return -1;
			};


			// menu at the top for demo purposes
			this.loadTestMenu = function() {
				$('#stages').on('change', function() {
					var stage = parseInt($(this).val());

					$('#beacon').removeClass();

					switch (stage) {
						case 0:
							$('#beacon').addClass('stage-0');
							break;
						case 1:
							$('#beacon').addClass('stage-1');
							break;
						case 2:
							$('#beacon').addClass('stage-2');
							break;
						case 3:
							$('#beacon').addClass('stage-3');
							break;
						case 4:
							$('#beacon').addClass('stage-4');
							break;
						case 5:
							$('#beacon').addClass('stage-5');
							break;
					}
				});
			};
		};

		return Beacon;
	}
);