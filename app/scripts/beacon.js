/*
	Author: 		Gary Kuo
	Date: 			May 28, 2014
	Description: 	Beacon object sets up the board where Beacon will be displayed and loads up the individual bulbs. TODO: Canvas behind the board.
	
*/

var lightbulbs = [
	{ src: 'images/bulbs/1.png', x: 196, y: 1572, ring: 4 },
	{ src: 'images/bulbs/2.png', x: 394, y: 1045, ring: 4 },
	{ src: 'images/bulbs/3.png', x: 722, y: 731, ring: 3 },
	{ src: 'images/bulbs/4.png', x: 863, y: 990, ring: 2 },
	{ src: 'images/bulbs/5.png', x: 799, y: 1386, ring: 1 },
	{ src: 'images/bulbs/6.png', x: 998, y: 458, ring: 3 },
	{ src: 'images/bulbs/7.png', x: 1831, y: 442, ring: 4 },
	{ src: 'images/bulbs/8.png', x: 1395, y: 777, ring: 1 },
	{ src: 'images/bulbs/9.png', x: 2431, y: 817, ring: 2 },
	{ src: 'images/bulbs/10.png', x: 2403, y: 1072, ring: 1 },
	{ src: 'images/bulbs/11.png', x: 2738, y: 1165, ring: 2 },
	{ src: 'images/bulbs/12.png', x: 2806, y: 601, ring: 2 },
	{ src: 'images/bulbs/13.png', x: 3203, y: 683, ring: 3 },
	{ src: 'images/bulbs/14.png', x: 3256, y: 1033, ring: 3 },
	{ src: 'images/bulbs/15.png', x: 3180, y: 1320, ring: 3 },
	{ src: 'images/bulbs/16.png', x: 3620, y: 888, ring: 4 },
	{ src: 'images/bulbs/17.png', x: 3782, y: 627, ring: 4 },
	{ src: 'images/bulbs/18.png', x: 3592, y: 1415, ring: 3 },
	{ src: 'images/bulbs/19.png', x: 4306, y: 601, ring: 4 },
	{ src: 'images/bulbs/20.png', x: 4445, y: 1038, ring: 4 },
	{ src: 'images/bulbs/21.png', x: 4081, y: 1211, ring: 4 },
	{ src: 'images/bulbs/22.png', x: 4381, y: 1414, ring: 4 },
	{ src: 'images/bulbs/23.png', x: 4643, y: 1573, ring: 4 },
	{ src: 'images/bulbs/24.png', x: 4156, y: 1812, ring: 4 },
	{ src: 'images/bulbs/25.png', x: 3818, y: 2037, ring: 3 },
	{ src: 'images/bulbs/26.png', x: 4456, y: 2272, ring: 4 },
	{ src: 'images/bulbs/27.png', x: 4174, y: 2460, ring: 4 },
	{ src: 'images/bulbs/28.png', x: 3931, y: 2750, ring: 4 },
	{ src: 'images/bulbs/29.png', x: 3308, y: 2312, ring: 3 },
	{ src: 'images/bulbs/30.png', x: 3106, y: 1817, ring: 2 },
	{ src: 'images/bulbs/31.png', x: 3481, y: 2516, ring: 3 },
	{ src: 'images/bulbs/32.png', x: 3067, y: 2238, ring: 2 },
	{ src: 'images/bulbs/33.png', x: 2523, y: 1788, ring: 1 },
	{ src: 'images/bulbs/34.png', x: 2324, y: 2152, ring: 2 },
	{ src: 'images/bulbs/35.png', x: 2532, y: 2315, ring: 2 },
	{ src: 'images/bulbs/36.png', x: 2693, y: 2582, ring: 3 },
	{ src: 'images/bulbs/37.png', x: 2214, y: 2422, ring: 1 },
	{ src: 'images/bulbs/38.png', x: 1942, y: 2483, ring: 2 },
	{ src: 'images/bulbs/39.png', x: 1527, y: 2608, ring: 2 },
	{ src: 'images/bulbs/40.png', x: 1321, y: 2393, ring: 1 },
	{ src: 'images/bulbs/41.png', x: 803, y: 1824, ring: 2 },
	{ src: 'images/bulbs/42.png', x: 732, y: 2126, ring: 3 },
	{ src: 'images/bulbs/43.png', x: 638, y: 2414, ring: 4 }
];

var beacon = function() {
	var bc = $('#beacon'),
		BCWIDTH = 5100,
		BCHEIGHT = 3300,
		bulbsArr = [];
	
	var init = function() {
		loadBulbs( lightbulbs, 0);
	};
	
	// recursively load each bulb from the PSD file
	// with the correct width and height and X/Y pos
	// buildObj = the JSON containing info from the PSD
	var loadBulbs = function( bulbs, i, callback ) {
		if ( i < lightbulbs.length ) {
			var bulb = new lightbulb( bulbs[i] ),
				img = new Image();
		
			img.onload = function() {
				// set up the light bulb
				var id = 'bulb-' + (i+1),
					w = this.width,
					h = this.height,
					percW = (w / 5100) * 100,
					percH = (h / 5100) * 100,
					percX = (bulb.x / 5100) * 100,
					percY = (bulb.y / 3300) * 100;
				bulb.set(id, w, h, percW, percH, percX, percY);
				bulb.enableFlicker();
				
				// show the bulb
				displayBulb( bulb );
				
				// store the bulb for easy access!
				bulb.storeBulb( $('#' + id) );
				bulbsArr[i] = bulb;
			
				// load up the next bulb
				loadBulbs(lightbulbs, i+1, callback);
			}
		
			img.src = bulb.src;
		}
		
		// what should we do after all the bulbs is displayed?
		else if ( i >= lightbulbs.length && typeof callback == 'function' ) {
			callback();
		}
	};
	
	// add a bulb to the board
	var displayBulb = function( bulb ) {
		var imgHtml = '<img id="' + bulb.id + '" src=" ' + bulb.src + '" alt="" width="' + bulb.percWidth + '%" class="lightbulb ring-' + bulb.ring + '" style="left: ' + bulb.percX + '%; top: ' + bulb.percY + '%;" />' +
					  '<img id="' + bulb.id + '-duplicate" src=" ' + bulb.src + '" alt="" width="' + bulb.percWidth + '%" class="lightbulb duplicate ring-' + bulb.ring + '" style="left: ' + bulb.percX + '%; top: ' + bulb.percY + '%;" />';
		bc.append( imgHtml );
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

// when the background loads
$('.beacon-background').load(function() {
	var bc = new beacon();
});

// when the doc loads
$('document').ready(function() {
	loadTestMenu();
});