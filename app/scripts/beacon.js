/*
	Author: 		Gary Kuo
	Date: 			May 28, 2014
	Description: 	Beacon object sets up the board where Beacon will be displayed and loads up the individual bulbs. TODO: Canvas behind the board.
	
*/

var CONSTANTS = { bcwidth: 5100, bcheight: 3300 };

var Beacon = function( callback ) {
	var bc = $('#beacon'),
		lightbulbs = $('.lightbulb'),
		users = $('#users ul'),
		usersList = users.find('li'),
		usersShown = 0;
	
	var init = function() {
		loadBulbs( lightbulbs, 0, function() {
			bc.removeClass('init');
			bc.addClass('fadein');
			if ( typeof callback == 'function' ) {
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
				if (this.complete)
					$(this).load();
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
	
	this.addUser = function( user ) {
		users.append( '<li id="user-' + user.id + '"><p>' + user.name + '</p><img src="images/user.png" alt="" /></li>' );
		// var userToBeAdded = $('#user-' + user.id);
		// userToBeAdded.css('-webkit-transform', 'rotate(' + 0 + 'deg)');
		// userToBeAdded.css('-webkit-transform', 'rotate(' + usersShown*12 + 'deg)');
		$('#user-' + user.id).animateRotate( usersShown*12 );
		usersShown++;
	};
	
	this.removeUser = function( user ) {
		var userToBeRemoved = $('#user-' + user.id),
			nextAll = userToBeRemoved.nextAll();
		
		// remove user
		userToBeRemoved.remove();
		
		// move all the other users down
		nextAll.each(function() {
			var rotateValue = getRotationValue( $(this).attr('id') );
			$(this).css('-webkit-transform', 'rotate(' + (rotateValue-12) + 'deg)');
		});
		
		usersShown--;
	};
	
	// via http://css-tricks.com/get-value-of-css-rotation-through-javascript/
	var getRotationValue = function(n) {
		var el = document.getElementById(n);
		var st = window.getComputedStyle(el, null);
		var tr = st.getPropertyValue("-webkit-transform") ||
		         st.getPropertyValue("-moz-transform") ||
		         st.getPropertyValue("-ms-transform") ||
		         st.getPropertyValue("-o-transform") ||
		         st.getPropertyValue("transform") ||
		         "FAIL";

		// With rotate(30deg)...
		// matrix(0.866025, 0.5, -0.5, 0.866025, 0px, 0px)
		// console.log('Matrix: ' + tr);

		// rotation matrix - http://en.wikipedia.org/wiki/Rotation_matrix

		var values = tr.split('(')[1].split(')')[0].split(',');
		var a = values[0];
		var b = values[1];
		var c = values[2];
		var d = values[3];

		var scale = Math.sqrt(a*a + b*b);

		// console.log('Scale: ' + scale);

		// arc sin, convert from radians to degrees, round
		var sin = b/scale;
		// next line works for 30deg but not 130deg (returns 50);
		// var angle = Math.round(Math.asin(sin) * (180/Math.PI));
		var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));

		return angle;
	};

	// http://stackoverflow.com/questions/15191058/css-rotation-cross-browser-with-jquery-animate
	$.fn.animateRotate = function(angle, duration, easing, complete) {
	    var args = $.speed(duration, easing, complete);
	    var step = args.step;
	    return this.each(function(i, e) {
	        args.step = function(now) {
	            $.style(e, 'transform', 'rotate(' + now + 'deg)');
	            if (step) return step.apply(this, arguments);
	        };

	        $({deg: 0}).animate({deg: angle}, args);
	    });
	};
};

// menu at the top for demo purposes
var loadTestMenu = function() {
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

var bc;
$('document').ready(function() {
		bc = new Beacon( function() {
		// bc.addUser(new User({'id': '1', 'name': 'Test', 'practice': 'FED'}));
		// bc.removeUser({ 'id': '1' });
	});
	loadTestMenu();
});