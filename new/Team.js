(function (w) {
	
	'use strict';
	
	w.Team = new Class({
		
		Extends: w.Base,
		
		Implements: Options,
		
		options: {
			shirtColor: 'black',
			textColor:  'rgba(255, 255, 255, 0.8)',
			name: null,
			home: false
		},
		
		fieldPlayers:        [],
		goalkeeper:          null,
		coach:               null,
		otherTeam:           null,
		facing:              null,
		
		receivingPlayer:     null,
		playerClosestToBall: null,
		controllingPlayer:   null,
		supportingPlayer:    null,
		currentState:        'prepareForKickOff',
		
		initialize: function (options) {
			this.setOptions(options);
			this.facing = (this.options.home) ? w.Soccer.get('awaySide') : w.Soccer.get('homeSide');
		},
		
		draw: function () {
			return this;
		},
		
		update: function () {
			// Update each player
			return this;
		},
		
		render: function () {
			return this;
		},
		
		addPlayer: function (player) {
			var player = new w.Player(this, player);
			
			this.fieldPlayers.push(player);
		},
		
		dummyPlayers: function (players) {
			var i, regions, positions = [
				'defender',
				'defender',
				'attacker',
				'attacker'
			];
			
			if (this.facing === 'right') {
				regions = [3, 5, 6, 8];
			} else {
				regions = [14, 12, 11, 9];
			}
			
			for (i = 0; i < players; i += 1) {
				this.addPlayer({
					number: i + 2,
					attributes: {
						strength:   Number.random(0, 1000),
						stamina:    Number.random(0, 1000),
						pace:       Number.random(0, 1000),
						agility:    Number.random(0, 1000),
						precision:  Number.random(0, 1000),
						defense:    Number.random(0, 1000),
						attack:     Number.random(0, 1000),
						skillmoves: Number.random(0, 1000),
						intercept:  Number.random(0, 1000)
					},
					homeRegion: w.Soccer.field.regions[regions[i]]
				});
			}
		},
		
		defending: function () {
			
		},
		
		attacking: function () {
			
		},
		
		pressure: function () {
			
		}
		
	});
	
}(window));