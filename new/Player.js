(function (w) {
	
	'use strict';
	
	w.Player = new Class({
		
		Extends: w.Base,
		
		Implements: Options,
		
		options: {
			number: 1,
			name: null,
			homeRegion: null,
			
			attributes: {
				strength:   0,
				stamina:    0,
				pace:       0,
				agility:    0,
				precision:  0,
				defense:    0,
				attack:     0,
				skillmoves: 0,
				intercept:  0
			},
			
			info: {
				height:     null,
				weight:     null,
				foot:       null,
				mentality:  null
			}
		},
		
		hasBall: false,
		state: null,
		team: null,
		isHome: true,
		
		initialize: function (team, options) {
			this.team = team;
			this.setOptions(options);
			
			this.draw();
		},
		
		listen: function (message) {
			
		},
		
		draw: function () {
			this.element = new Kinetic.Group({
				x: this.options.homeRegion.centerX,
				y: this.options.homeRegion.centerY,
				width: 24,
				height: 24,
				offset: {x: 12, y: 12},
				rotationDeg: (this.team.facing === 'right') ? 90 : -90
			});
			
			this.shirt = new Kinetic.Rect({
				x: 0,
				y: 0,
				width: 24,
				height: 24,
				fillPatternImage: w.Soccer.Images[this.team.get('shirtColor')]
			});
			
			this.number = new Kinetic.Text({
				x: 0,
				y: 7,
				width: 24,
				height: 24,
				fill: this.team.get('textColor'),
				fontSize: 11,
				align: 'center',
				text: this.options.number
			});
			
			this.element.add(this.shirt).add(this.number);
			
			w.Soccer.Foreground.add(this.element);
			
			this.render();
			return this;
		},
		
		update: function () {
			// Update each player
			return this;
		},
		
		render: function () {
			w.Soccer.Foreground.draw();
			return this;
		},
		
		instructions: {
			
		}
		
	});
	
}(window));