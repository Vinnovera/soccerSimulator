!function (w) {
	
	'use strict';
	
	w.Goal = new Class({
		
		leftPost:    null,
		rightPost:   null,
		facing:      null,
		center:      null,
		goalsScored: 0,
		
		initialize: function (team) {
			this.facing = (team === 'blue') ? 'right' : 'left';
			this.create();
		},
		
		create: function () {
			if (this.facing === 'right') {
	 			this.leftPost = {
					x: w.Soccer.Pitch.regions[1].left,
					y: w.Soccer.Pitch.regions[1].top
				};
			
				this.rightPost = {
					x: w.Soccer.Pitch.regions[1].left,
					y: w.Soccer.Pitch.regions[1].bottom
				};
			} else {
	 			this.rightPost = {
					x: w.Soccer.Pitch.regions[16].right,
					y: w.Soccer.Pitch.regions[16].top
				};
			
				this.leftPost = {
					x: w.Soccer.Pitch.regions[16].right,
					y: w.Soccer.Pitch.regions[16].bottom
				};
			}
			
			this.drawGoalKeeperArea();
		},
		
		drawGoalKeeperArea: function () {
			this.goalKeeperArea = new Kinetic.Rect({
				width: w.Soccer.Pitch.regions[1].width / 2,
				height: w.Soccer.Pitch.regions[1].height,
				fill: 'transparent',
				stroke: 'rgba(255, 255, 255, 0.4)',
				strokeWidth: 2,
				x: (this.facing === 'right') ? this.leftPost.x - 2 : this.leftPost.x - w.Soccer.Pitch.regions[1].width / 2,
				y: (this.facing === 'right') ? this.leftPost.y : this.rightPost.y
			});
			
			w.Soccer.Background.add(this.goalKeeperArea);
			w.Soccer.Background.draw();
		},
		
		update: function () {
			
		},
		
		render: function () {
			
		},
		
		scored: function () {
			
		}
		
	});
	
}(window);