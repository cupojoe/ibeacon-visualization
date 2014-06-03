/*
	Author: 		Gary Kuo
	Date: 			May 28, 2014
	Description: 	Lightbulb object holds all properties and methods pertaining to a single bulb.
*/

define([
	'jquery'
	],
	function ($) {
		var Lightbulb = function( param ) {

			// default properties
			var prop = {
				id: null,
				bulb: null,
				src: 'images/bulbs/1.png',
				x: null,
				y: null,
				percX: null,
				percY: null,
				width: null,
				height: null,
				percWidth: null,
				percHeight: null,
				ring: 0,
				flickerValue: 0
			};

			// override the default properties if "param" was passed
			$.extend( prop, param );

			// accessors
			this.id = prop.id;
			this.bulb = prop.bulb;
			this.src = prop.src;
			this.x = prop.x;
			this.y = prop.y;
			this.percX = prop.percX;
			this.percY = prop.percY;
			this.width = prop.width;
			this.height = prop.height;
			this.percWidth = prop.percWidth;
			this.percHeight = prop.percHeight;
			this.ring = prop.ring;

			var bulb = prop.bulb;

			this.set = function(id, x, y, w, h, percW, percH, percX, percY, b) {
				this.id = id;
				this.x = x;
				this.y = y;
				this.w = w;
				this.h = h;
				this.percWidth = percW;
				this.percHeight = percH;
				this.percX = percX;
				this.percY = percY;
				this.bulb = b;
				bulb = this.bulb;
			};

			this.load = function() {
				this.bulb.css('width', this.percWidth + '%' );
				this.bulb.css('left', this.percX + '%' );
				this.bulb.css('top', this.percY + '%' );
			};

			this.getBulb = function() {
				return this.bulb;
			};

			// === flickers below ===

			var flickerCycle,
				randomInterval;

			this.enableFlicker = function() {
				initFlicker();
			};

			var initFlicker = function() {
				randomInterval = 1 + Math.floor(Math.random() * 25);
				repeatFlicker( randomInterval );
			};

			var repeatFlicker = function( interval ) {
				randomInterval = 1 + Math.floor(Math.random() * 25);
				flickerCycle = setInterval(function() {
					flicker();
					clearInterval( flickerCycle );
					repeatFlicker( randomInterval );
				}, randomInterval*500);
			};

			var flicker = function() {
				// flicker on
				bulb.addClass('flicker');

				// flicker off
				setTimeout(function() {
					bulb.removeClass('flicker');
				}, 500);
			};

		};

		return Lightbulb;
	}
);