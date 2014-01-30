(function (w) {
	
	'use strict';
	
	/**
	 * The Player class is the base of fieldplayers and goalkeepers.
	 * @class
	 */
	w.Player = new Class({
		/** @lends Player */
		
		Extends: w.Base,
		
		Implements: Options,
		
		/** Options that can be set */
		options: {
			number: 1,
			homeRegion: null,
			
			info: {
				name:       null,
				height:     null,
				weight:     null,
				foot:       null,
				mentality:  null
			}
		},
		
		/** Boolean to query to see if a player has the ball */
		hasBall: false,
		
		/** Holds the player state */
		state: null,
		
		/** The player's team */
		team: null,
		
		/** Query to see if the player is in its home region */
		isHome: true,
		
		/**
		 * The constructor. Will automatically be called when a new instance of this class is created.
		 *
		 * @param {Object} team The team who owns this player
		 * @param {Object} options The options to set.
		 */
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