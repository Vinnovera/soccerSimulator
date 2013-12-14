!function (w) {
	
	'use strict';
	
	w.Team = new Class({
		
		Implements: Options,
		
		options: {
			receivingPlayer:     null,
			playerClosestToBall: null,
			controllingPlayer:   null,
			supportingPlayer:    null,
			currentState:        'prepareForKickOff',
			color:               null,
			facing:              null
		},
		
		otherTeam: null,
		
		players: [],
		
		initialize: function (options) {
			this.setOptions(options);
			this.createPlayers();
		},
		
		createPlayers: function () {
			var i, max = 4, player, regions, positions = [
				'defender',
				'defender',
				'attacker',
				'attacker'
			];
			
			if (this.options.color === 'blue') {
				regions = [3, 5, 6, 8];
			} else {
				regions = [14, 12, 11, 9];
			}
			
			for (i = 0; i < 4; i += 1) {
				player = new w.Player(this, {
					homeRegion: w.Soccer.Pitch.regions[regions[i]],
					position: positions[i],
					number: i + 2
				});
				
				this.players.push(player);
			}
		},
		
		update: function () {
			
		},
		
		render: function () {
			
		},
		
		setReceiver: function (player) {
			this.options.receivingPlayer = player;
		},
		
		setControllingPlayer: function (player) {
			this.options.controllingPlayer = player;
		},
		
		setSupportingPlayer: function (player) {
			this.options.supportingPlayer = player;
		},
		
		setPlayerClosestToBall: function (player) {
			this.options.playerClosestToBall = player;
		},
		
		returnAllFieldPlayersToHome: function () {
			
		},
		
		allPlayersAtHome: function () {
			
		},
		
		updateTargetsOfWaitingPlayers: function () {
			
		},
		
		canShoot: function () {
			
		},
		
		requestPass: function () {
			
		},
		
		getSupportSpot: function () {
			
		},
		
		changeState: function (state) {
			this.options.currentState = state;
			this[state]();
		},
		
		prepareForKickOff: function () {
			this.setReceiver(null);
			this.setControllingPlayer(null);
			this.setSupportingPlayer(null);
			this.setPlayerClosestToBall(null);
			
			this.returnAllFieldPlayersToHome();
		},
		
		defending: function () {
			
		},
		
		attacking: function () {
			
		}
		
	});
	
}(window);