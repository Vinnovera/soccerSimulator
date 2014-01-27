!function (w) {
	
	'use strict';
	
	w.Player = new Class({
		
		Implements: Options,
		
		options: {
			homeRegion: null,
			position:   null,
			number:     null
		},
		
		hasBall: false,
		
		state: null,
		
		team: null,
		
		isHome: true,
		
		initialize: function (team, options) {
			this.team = team;
			this.setOptions(options);
			this.draw();
		},
		
		draw: function () {
			this.element = new Kinetic.Group({
				x: this.options.homeRegion.centerX,
				y: this.options.homeRegion.centerY,
				width: 24,
				height: 24,
				offset: {x: 12, y: 12},
				rotationDeg: (this.team.options.facing === 'right') ? 90 : -90
			});
			
			this.shirt = new Kinetic.Rect({
				x: 0,
				y: 0,
				width: 24,
				height: 24,
				fillPatternImage: w.Soccer.Images[this.team.options.color]
			});
			
			this.number = new Kinetic.Text({
				x: 0,
				y: 7,
				width: 24,
				height: 24,
				fill: 'rgba(255, 255, 255, 0.8)',
				fontSize: 11,
				align: 'center',
				text: this.options.number
			});
			
			this.element.add(this.shirt).add(this.number);
			
			w.Soccer.Foreground.add(this.element);
		},
		
		update: function () {
			var ballPosition    = w.Soccer.Pitch.ball.element.getPosition(),
			    currentPosition = this.element.getPosition();
			
			if (!this.running) {
				// Keep your eyes on the ball
				this.rotateTo(currentPosition, ballPosition);
			}
			
			// Is home?
			if (currentPosition.x === this.options.homeRegion.centerX && currentPosition.y === this.options.homeRegion.centerY) {
				this.isHome = true;
			} else {
				this.isHome = false;
			}
		},
		
		render: function () {
			
		},
		
		handleMessage: function (msg) {
			this.messages[msg].apply(this);
		},
		
		messages: {
			returnHome: function () {
				this.state = 'returnToHomeRegion';
				this.returnToHome();
			},
			
			chaseBall: function () {
				this.state = 'chaseBall';
				this.chaseBall();
			},
			
			wait: function () {
				this.state = 'waiting';
				this.wait();
			}
		},
		
		wait: function () {
			this.runTo = false;
			
			if (this.running) {
				this.running.destroy();
				this.running = false;
			}
		},
		
		chaseBall: function () {
			var ballPosition    = w.Soccer.Pitch.ball.element.getPosition(),
			    currentPosition = this.element.getPosition(),
				x, y, speed;
				
			this.rotateTo(currentPosition, ballPosition);
			
			if (!this.runTo || ballPosition.x !== this.runTo.x || ballPosition.y !== this.runTo.y) {
				this.runTo = ballPosition;
				
				if (this.running) {
					this.running.destroy();
					this.running = false;
				} else {
					speed = Number.random(2, 7);
				
					this.running = new Kinetic.Tween({
						node: this.element,
						duration: speed,
						x: ballPosition.x,
						y: ballPosition.y,
						onFinish: function () {
							w.Soccer.Pitch.ball.trap(this);
							this.team.setControllingPlayer(this);
							this.hasBall = true;
						}.bind(this)
					});
				
					this.running.play();
				}
			}
		},
		
		returnToHome: function () {
			if (this.running) {
				this.running.destroy();
				this.running = false;
			}
			
			var speed = 1,
			    currentPosition = this.element.getPosition(),
				to    = {x: this.options.homeRegion.centerX, y: this.options.homeRegion.centerY};
			
			this.rotateTo(currentPosition, to);
			
			this.running = new Kinetic.Tween({
				node: this.element,
				duration: speed,
				x: this.options.homeRegion.centerX,
				y: this.options.homeRegion.centerY,
				onFinish: function () {
					this.handleMessage('waiting');
				}.bind(this)
			});
		
			this.running.play();
		},
		
		rotateTo: function (position, toPosition) {
			this.element.setRotationDeg(Math.atan2(position.x - toPosition.x, - (position.y - toPosition.y) )*(180/Math.PI) + 180);
		},
		
		isThreatened: function () {
			var closestOpponent  = this.team.otherTeam.options.playerClosestToBall,
			    opponentPosition = closestOpponent.element.getPosition(),
				myPosition       = this.element.getPosition(),
				diffX            = Math.abs(opponentPosition.x - myPosition.x),
				diffY            = Math.abs(opponentPosition.y - myPosition.y);
				
			if (diffX < 20 && diffY < 20) {
				return true;
			}
			
			return false;
		}
		
	});
	
}(window);