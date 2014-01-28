(function (w) {
	
	'use strict';
	
	/**
	 * The Game class holds it all together.
	 * Rendering and updating will be taken care of from here
	 * and holds the basic simulator options.
	 * @class
	 */
	w.Game = new Class({
		/** @lends Game */
		
		Extends: w.Base,
		
		Implements: Options,
		
		/** Options that can be set */
		options: {
			/**
			 * Set on which side the home team should play on
			 * @memberOf Game
			 * @type String
			 */
			homeSide: 'left',
			
			/**
			 * Set on which side the away team should play on
			 * @memberOf Game
			 * @type String
			 */
			awaySide: 'right'
		},
		
		/** Stores preloaded images */
		Images:   {},
		
		/** Holds actions that are registred through the register method */
		Actions:  [],
		
		field:    null,
		ball:     null,
		homeTeam: null,
		awayTeam: null,
		homeGoal: null,
		awayGoal: null,
		gameOn:   false,
		goalKeeperHasBall: false,
		
		/**
		 */
		initialize: function (id, options) {
			this.id = id;
			
			// Setup stage and layers
			this.build();
		},
		
		/**
		 */
		ready: function () {
			var _this = this;
			
			if (this.Actions.length < 0) {
				return;
			}
			
			Array.each(this.Actions, function (action) {
				action.apply(_this);
			});
		},
		
		/**
		 */
		register: function (action) {
			this.Actions.push(action);
		},
		
		/**
		 */
		preloadAssets: function (sources, callback) {
			var _this        = this,
			    loadedImages = 0,
			    numImages    = 0,
			    src;
		    
			for (src in sources) {
				numImages += 1;
			}
		
			for (src in sources) {
				this.Images[src] = new Image();
			
				this.Images[src].onload = function () {
					if (++loadedImages >= numImages) {
						callback.apply(_this);
					}
				};
			
				this.Images[src].src = sources[src];
			}
		},
		
		/**
		 */
		build: function () {
			// Create new kinetic stage
			this.Stage = new Kinetic.Stage({
				container: this.id,
				width: 840,
				height: 420
			});
			
			// Create layers
			this.Background = new Kinetic.Layer();
			this.Foreground = new Kinetic.Layer();
	
			// Add layers to stage
			this.Stage.add(this.Background);
			this.Stage.add(this.Foreground);
			
			return this;
		}
		
	});
	
}(window));