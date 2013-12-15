!function (w) {
	
	'use strict';
	
	w.Ball = new Class({
		
		oldPosition: null,
		owner:       false,
		pitchBoundry: false,
		
		initialize: function () {
			this.draw();
		},
		
		testCollisionWithWalls: function () {
			
		},
		
		draw: function () {
			this.element = new Kinetic.Rect({
				x: w.Soccer.Pitch.playingArea.center.x,
				y: w.Soccer.Pitch.playingArea.center.y,
				width: 14,
				height: 14,
				offset: {x: 7, y: 7},
				fillPatternImage: w.Soccer.Images.ball
			});
			
			w.Soccer.Foreground.add(this.element);
			//w.Soccer.foreground.draw();
		},
		
		update: function () {
			
		},
		
		render: function () {
			
		},
		
		handleMessage: function (msg) {
			return false;
		},
		
		kick: function (direction, force) {
			
		},
		
		timeToCoverDistance: function (from, to, force) {
			
		},
		
		futurePosition: function (time) {
			
		},
		
		trap: function (owner) {
			this.owner = owner;
			
			if (this.travelling) {
				this.travelling.destroy();
			}
		},
		
		placeAtPosition: function (coords) {
			
		},
		
		move: function (x, y) {
			var speed = Number.random(1, 2);
		
			this.travelling = new Kinetic.Tween({
				node: this.element,
				duration: speed,
				x: x,
				y: y,
				onFinish: function () {
				}.bind(this)
			});
		
			this.travelling.play();
		}
		
	});
	
}(window);