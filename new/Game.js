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
			awaySide: 'right',
			
			/**
			 * Set the number of frames per second
			 * @memberOf Game
			 * @type Integer
			 */
			fps: 30
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
		 * The constructor. Will automatically be called when a new instance of this class is created.
		 *
		 * @param {String} id The ID of the HTML element
		 * @param {Object} options The options to set.
		 */
		initialize: function (id, options) {
			this.id = id;
			
			/** Setup kinetic stage and layers */
			this.build();
			
			/** Start the updating */
			this.update();
		},
		
		/**
		 * Loops through all functions in the Actions array and call them one by one.
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
		 * Register an action/function that will be called when the game is ready.
		 * 
		 * @param {Function} action The function to be called
		 */
		register: function (action) {
			this.Actions.push(action);
		},
		
		/**
		 * Loops through a given array of image sources
		 * and fires a callback function when all images are loaded.
		 *
		 * @param {Object} sources An object with keys and image sources
		 * @param {Function} callback The function that will be called when all images are loaded
		
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
		
		/** Build a kinetic stage with needed layers */
		build: function () {
			/** Create new kinetic stage */
			this.Stage = new Kinetic.Stage({
				container: this.id,
				width: 840,
				height: 420
			});
			
			/** Create layers */
			this.Background = new Kinetic.Layer();
			this.Foreground = new Kinetic.Layer();
	
			/** Add layers to stage */
			this.Stage.add(this.Background);
			this.Stage.add(this.Foreground);
			
			return this;
		},
		
		/** Render the foreground */
		render: function () {
			this.Foreground.draw();
		},
		
		/** On each frame call the update function on each object and render the foreground */
		update: function () {
			var _this = this, draw, now, then = Date.now(), interval = 1000/this.get('fps'), delta, run;
			
			run = function () {
				requestAnimationFrame(run);
				
				now = Date.now();
				delta = now - then;
				
				if (delta > interval) {
					then = now - (delta % interval);
					
					if (!this.gameOn) {
						this.startGame();
					}
					
					/** Redraw foreground */
					this.render();
				}
			}.bind(this);
			
			run();
		},
		
		/** Check if the game is ready to start */
		startGame: function () {
			if (this.blueTeam && this.redTeam && this.ball && this.blueGoal && this.redGoal) {
				this.gameOn = true;
				return true;
			}
			
			return false;
		}
		
	});
	
}(window));