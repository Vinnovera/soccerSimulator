(function (w) {
	
	'use strict';
	
	w.Goal = new Class({
		
		Extends: w.Base,
		
		leftPost:  null,
		rightPost: null,
		facing:    null,
		center:    null,
		
		initialize: function (team) {
			this.facing = (team === 'home') ? 'right' : 'left';
			this.build();
		},
		
		build: function () {
			if (this.facing === 'right') {
	 			this.leftPost = {
					x: w.Soccer.field.regions[2].left,
					y: w.Soccer.field.regions[2].top
				};
			
				this.rightPost = {
					x: w.Soccer.field.regions[4].left,
					y: w.Soccer.field.regions[4].bottom
				};
			} else {
	 			this.rightPost = {
					x: w.Soccer.field.regions[68].right,
					y: w.Soccer.field.regions[68].top
				};
			
				this.leftPost = {
					x: w.Soccer.field.regions[70].right,
					y: w.Soccer.field.regions[70].bottom
				};
			}
			
			this.draw();
		},
		
		draw: function () {
			this.drawGoalKeeperArea();
			
			return this;
		},
		
		drawGoalKeeperArea: function () {
			this.goalKeeperArea = new Kinetic.Rect({
				width: w.Soccer.field.regions[1].width,
				height: w.Soccer.field.regions[1].height * 2,
				fill: 'transparent',
				stroke: 'rgba(255, 255, 255, 0.4)',
				strokeWidth: 2,
				x: (this.facing === 'right') ? this.leftPost.x - 2 : this.leftPost.x - w.Soccer.field.regions[1].width,
				y: (this.facing === 'right') ? this.leftPost.y : this.rightPost.y
			});
			
			w.Soccer.Background.add(this.goalKeeperArea);
			this.render();
		},
		
		update: function () {
			// On each update check if the ball is in the goal
			
			return this;
		},
		
		render: function () {
			w.Soccer.Background.draw();
		}
		
	});
	
}(window));