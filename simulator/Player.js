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
			
		},
		
		render: function () {
			
		},
		
		handleMessage: function (msg) {
			this.messages[msg].apply(this);
		},
		
		messages: {
			returnHome: function () {
				this.state = 'returnToHomeRegion';
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
			
			if (this.runTo) {
				if (ballPosition.x !== this.runTo.x || ballPosition.y !== this.runTo.y) {
					this.runTo = ballPosition;
					
					if (this.running) {
						this.running.destroy();
					}
				}
			}
			
			if (!this.runTo) {
				this.runTo = ballPosition;
				
				if (!this.running) {
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
		
		rotateTo: function (position, toPosition) {
			var h, b, a, x = toPosition.x, y = toPosition.y;
			
			h = Math.sqrt(Math.pow(y, 2) + Math.pow(x, 2));
			b = Math.round(Math.atan(y/x) * 180 / Math.PI * 100) / 100;
			a = 90 - b;
			
			if (this.team.options.facing === 'left') {
				a = -a;
			}
			
			if (position.y < y) {
				a *= 2;
			}
			
			this.element.setRotationDeg(a);
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