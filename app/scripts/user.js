var User = function( param ) {
	
	var prop = {
		id: null,
		name: null,
		practice: null,
		timeCheckin: null,
		timeCheckout: null,
		elapsedTime: null
	};
	
	$.extend( prop, param );
	
	this.id = prop.id;
	this.name = prop.name;
	this.practice = prop.practice;
	this.timeCheckin = prop.timeCheckin;
	this.timeCheckout = prop.timeCheckout;
	this.elapsedTime = prop.elapsedTime;
	
	this.set = function( id, name, practice ) {
		this.id = id;
		this.name = name;
		this.practice = practice;
	};
	
};