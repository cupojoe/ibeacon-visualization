/*
	Author: 		Gary Kuo
	Date: 			May 28, 2014
	Description: 	Beacon object sets up the board where Beacon will be displayed and loads up the individual bulbs. TODO: Canvas behind the board.
	
*/

var beacon = function() {
	var bc = $('#beacon'),
		CONSTANTS = { bcwidth: 5100, bcheight: 3300 },
		lightbulbs = $('.lightbulb');
	
	var init = function() {
		loadBulbs( lightbulbs, 0, function() {
			bc.removeClass('init');
			bc.addClass('fadein');
		} );
	};
	
	// recursively load each bulb from the PSD file
	// with the correct width and height and X/Y pos
	var loadBulbs = function( lightbulbs, i, callback ) {
		if ( i < lightbulbs.length ) {
			
			$('#' + lightbulbs[i].id).one('load', function() {
				var bulb = new lightbulb();
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
				
				bulb.enableFlicker();
			
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

// when the doc loads
$('document').ready(function() {
	var bc = new beacon();
	loadTestMenu();
});