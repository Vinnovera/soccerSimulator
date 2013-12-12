!function (w) {
	
	'use strict';
	
	w.Team = new Class({
		
		receivingPlayer:     null,
		playerClosestToBall: null,
		controllingPlayer:   null,
		supportingPlayer:    null,
		currentState:        'prepareForKickOff',
		color:               null,
		otherTeam:           null,
		
		update: function () {
			
		},
		
		render: function () {
			
		},
		
		setReceiver: function (player) {
			this.receivingPlayer = player;
		},
		
		setControllingPlayer: function (player) {
			this.controllingPlayer = player;
		},
		
		setSupportingPlayer: function (player) {
			this.supportingPlayer = player;
		},
		
		setPlayerClosestToBall: function (player) {
			this.playerClosestToBall = player;
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
			this.currentState = state;
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