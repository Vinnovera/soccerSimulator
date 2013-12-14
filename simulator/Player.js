!function (w) {
	
	'use strict';
	
	w.Player = new Class({
		
		Implements: Options,
		
		options: {
			homeRegion: null,
			position:   null,
			number:     null
		},
		
		team: null,
		
		initialize: function (team, options) {
			this.team = team;
			this.setOptions(options);
			this.draw();
		},
		
		draw: function () {
			this.element = new Kinetic.Group({
				x: this.options.homeRegion.centerX,
				y: this.options.homeRegion.centerY,
				width: 24,
				height: 24,
				offset: {x: 12, y: 12},
				rotationDeg: (this.team.options.facing === 'right') ? 90 : -90
			});
			
			this.shirt = new Kinetic.Rect({
				x: 0,
				y: 0,
				width: 24,
				height: 24,
				fillPatternImage: w.Soccer.Images[this.team.options.color]
			});
			
			this.number = new Kinetic.Text({
				x: 0,
				y: 7,
				width: 24,
				height: 24,
				fill: 'rgba(255, 255, 255, 0.8)',
				fontSize: 11,
				align: 'center',
				text: this.options.number
			});
			
			this.element.add(this.shirt).add(this.number);
			
			w.Soccer.Foreground.add(this.element);
		},
		
		update: function () {
			
		},
		
		render: function () {
			
		},
		
		handleMessage: function (msg) {
			
		}
		
	});
	
}(window);