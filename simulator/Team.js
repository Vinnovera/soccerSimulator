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
		
		fieldPlayers: [],
		
		goalKeeper: null,
		
		initialize: function (options) {
			this.setOptions(options);
			this.createFieldPlayers();
			this.createGoalKeeper();
		},
		
		createFieldPlayers: function () {
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
				player = new w.FieldPlayer(this, {
					homeRegion: w.Soccer.Pitch.regions[regions[i]],
					position: positions[i],
					number: i + 2
				});
				
				this.fieldPlayers.push(player);
			}
		},
		
		createGoalKeeper: function () {
			var goalKeeper = new w.GoalKeeper(this, {
				homeRegion: (this.options.color === 'blue') ? w.Soccer.Pitch.regions[1] : w.Soccer.Pitch.regions[16],
				position: 'goalkeeper',
				number: 1
			});
			
			this.goalKeeper = goalKeeper;
		},
		
		update: function () {
			// If the game is stopped, do nothing
			if (!w.Soccer.Pitch.gameOn) {
				return;
			}
			
			Array.each(this.fieldPlayers, function (player, i) {
				player.update();
			});
			
			// Locate the player who is closest to the ball
			this.findPlayerClosestToBall();
			
			// If no one in the team has the ball, chase it, otherwise go to attack
			if (!w.Soccer.Pitch.ball.owner) {
				this.options.playerClosestToBall.handleMessage('chaseBall');
			} else if (w.Soccer.Pitch.ball.owner.team.options.color !== this.options.color) {
				// The opponent has the ball, enter defence mode
				if (this.allPlayersAtHome()) {
					this.wait();
				} else {
					this.returnAllFieldPlayersToHome();
				}
				
				// Now check if you can take him down right now or if you have to get to the ball first
				/*if (this.options.playerClosestToBall.inTackleRange()) {
					
				} else {
					this.options.playerClosestToBall.handleMessage('chaseBall');
				}*/
			} else {
				// You have the ball, enter attack mode
				
				// Mow check if the player is threatened or have time to think
				if (this.options.controllingPlayer.isThreatened()) {
					
				} else {
					
				}
				
			}
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
		
		findSupportingPlayer: function () {
			if (!this.options.playerClosestToBall) {
				return false;
			}
		},
		
		findPlayerClosestToBall: function () {
			var shortest = false, position, distance, closestToBall;
			
			Array.each(this.fieldPlayers, function (player, i) {
				position = player.element.getPosition();
				distance = this.lineDistance(position, w.Soccer.Pitch.ball.element.getPosition());
				
				if (!shortest || distance < shortest) {
					shortest = distance;
					closestToBall = player;
				}
			}.bind(this));
			
			this.setPlayerClosestToBall(closestToBall);
		},
		
		lineDistance: function (from, to) {
			var xs = 0,
			    ys = 0;

			xs = to.x - from.x;
			xs = xs * xs;

			ys = to.y - from.y;
			ys = ys * ys;

			return Math.sqrt( xs + ys );
		},
		
		setPlayerClosestToBall: function (player) {
			if (this.options.playerClosestToBall && player.options.number !== this.options.playerClosestToBall.options.number) {
				this.options.playerClosestToBall.handleMessage('wait');
			}
			
			this.options.playerClosestToBall = player;
		},
		
		returnAllFieldPlayersToHome: function () {
			this.defending();
			
			Array.each(this.fieldPlayers, function (player, i) {
				player.handleMessage('returnHome');
			});
		},
		
		allPlayersAtHome: function () {
			var allPlayersHome = true;
			
			Array.each(this.fieldPlayers, function (player) {
				if (!player.isHome) {
					allPlayersHome = false;
				}
			});
			
			if (allPlayersHome) {
				if (!this.goalKeeper.isHome) {
					allPlayersHome = false;
				}
			}
			
			return allPlayersHome;
		},
		
		wait: function () {
			Array.each(this.fieldPlayers, function (player) {
				player.handleMessage('wait');
			});
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
			var regions;
			
			if (this.options.color === 'blue') {
				regions = [3, 5, 6, 8];
			} else {
				regions = [14, 12, 11, 9];
			}
			
			this.options.currentState = 'defending';
			
			Array.each(this.players, function (player, i) {
				player.options.homeRegion = w.Soccer.Pitch.regions[regions[i]];
			});
		},
		
		attacking: function () {
			var regions;
			
			if (this.options.color === 'blue') {
				regions = [4, 8, 12, 14];
			} else {
				regions = [13, 9, 5, 3];
			}
			
			this.options.currentState = 'attacking';
			
			Array.each(this.players, function (player, i) {
				player.options.homeRegion = w.Soccer.Pitch.regions[regions[i]];
			});
		}
		
	});
	
}(window);