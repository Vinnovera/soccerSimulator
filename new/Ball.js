(function (w) {
	
	'use strict';
	
	w.Ball = new Class({
		
		Extends: w.Base,
		
		Implements: Options,
		
		options: {
			x: 'center',
			y: 'center'
		},
		
		lastPosition: null,
		owner:        null,
		pitchBoundry: null,
		
		initialize: function (options) {
			this.setOptions(options);
			this.draw();
		},
		
		draw: function () {
			this.element = new Kinetic.Rect({
				x: (this.options.x === 'center') ? w.Soccer.field.playingArea.center.x : this.options.x,
				y: (this.options.y === 'center') ? w.Soccer.field.playingArea.center.y : this.options.y,
				width: 14,
				height: 14,
				offset: {x: 7, y: 7},
				fillPatternImage: w.Soccer.Images.ball
			});
			
			w.Soccer.Foreground.add(this.element);
			this.render();
			
			return this;
		},
		
		update: function () {
			// On each update check if the ball is in the goal
			// 
			
			return this;
		},
		
		render: function () {
			w.Soccer.Foreground.draw();
		},
		
		dropBall: function (x, y) {
			this.element.setPosition({
				x: x,
				y: y
			});
			
			this.render();
		},
		
		testCollisionWithWalls: function () {
			
		},
		
		timeToCoverDistance: function (from, to, force) {
			
		},
		
		futurePosition: function (time) {
			
		},
		
		travel: function (force, direction) {
			
		},
		
		trap: function (player) {
			
		}
		
	});
	
}(window));