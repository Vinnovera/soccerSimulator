!function (w) {
	
	'use strict';
	
	// Setup new game
	w.Soccer = new w.Game('soccer');
	
	// Create field
	w.Soccer.register(function () {
		this.field = new w.Field();
	});
	
	// Create goals
	w.Soccer.register(function () {
		this.homeGoal = new w.Goal('home');
		this.awayGoal = new w.Goal('away');
	});
	
	// Preload assets
	w.Soccer.preloadAssets({
		background: 'assets/img/grass.png',
		ball: 'assets/img/ball.png',
		blue: 'assets/img/blue.png',
		red:  'assets/img/red.png'
	}, function () {
		// When assets is loaded, game is ready
		this.ready();
	});
	
}(window);