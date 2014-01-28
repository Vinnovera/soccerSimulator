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
	
	// Create the ball
	w.Soccer.register(function () {
		this.ball = new w.Ball();
	});
	
	// Create home team
	w.Soccer.register(function () {
		this.homeTeam = new w.Team({
			shirtColor: 'blue',
			textColor: 'white',
			name: 'Juventus',
			home: true
		});
		
		// Create dummy players
		this.homeTeam.dummyPlayers(4);
	});
	
	// Create away team
	w.Soccer.register(function () {
		this.awayTeam = new w.Team({
			shirtColor: 'red',
			textColor: 'white',
			name: 'Barcelona',
			home: false
		});
		
		// Create dummy players
		this.awayTeam.dummyPlayers(4);
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