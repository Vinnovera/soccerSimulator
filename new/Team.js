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
			/** Update field players */
			Array.each(this.fieldPlayers, function (player) {
				player.update();
			});
			
			/** Update goalkeeper */
			this.goalkeeper.update();
			
			return this;
		},
		
		render: function () {
			return this;
		},
		
		addFieldPlayer: function (player) {
			var player = new w.FieldPlayer(this, player);
			
			this.fieldPlayers.push(player);
		},
		
		addGoalkeeper: function (goalkeeper) {
			var goalkeeper = new w.Goalkeeper(this, goalkeeper);
			
			this.goalkeeper = goalkeeper;
		},
		
		dummyPlayers: function (players) {
			var i, regions, goalkeeperRegion, positions = [
				'defender',
				'defender',
				'attacker',
				'attacker'
			];
			
			if (this.facing === 'right') {
				regions = [4, 6, 8];
				goalkeeperRegion = 1;
			} else {
				regions = [13, 11, 9];
				goalkeeperRegion = 16;
			}
			
			for (i = 0; i < players; i += 1) {
				this.addFieldPlayer({
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
			
			this.addGoalkeeper({
				number: 1,
				attributes: {
					reflexes:   Number.random(0, 1000),
					stamina:    Number.random(0, 1000),
					pace:       Number.random(0, 1000),
					agility:    Number.random(0, 1000),
					precision:  Number.random(0, 1000),
					skillmoves: Number.random(0, 1000),
					intercept:  Number.random(0, 1000)
				},
				homeRegion: w.Soccer.field.regions[goalkeeperRegion]
			});
		},
		
		defending: function () {
			
		},
		
		attacking: function () {
			
		},
		
		pressure: function () {
			
		}
		
	});
	
}(window));