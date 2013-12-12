!function (w) {
	
	'use strict';
	
	w.Pitch = new Class({
		
		dimensions:        {x: 20, y: 10},
		meter:             42,
		showRegions:       true,
		spots:             {},
		
		ball:              null,
		redTeam:           null,
		blueTeam:          null,
		redGoal:           null,
		blueGoal:          null,
		playingArea:       null,
		totalRegions:      {x: 6, y: 3},
		regions:           [],
		gameOn:            false,
		goalKeeperHasBall: false,
		
		initialize: function () {
			this.draw();
		},
		
		draw: function () {
			// Dimensions
			this.width  = this.meter * this.dimensions.x;
			this.height = this.meter * this.dimensions.y;
			
			this.element = new Kinetic.Rect({
				x: 0,
				y: 0,
				width: this.width,
				height: this.height,
				fillPatternImage: w.Soccer.Images.background
			});
			
			w.Soccer.Background.add(this.element);
			w.Soccer.Background.draw();
			
			// Set spots
			this.spots.leftTop     = {x: 0, y: 0};
			this.spots.rightBottom = {x: this.width, y: this.height};
			this.spots.center      = {x: this.width / 2, y: this.height / 2};
			
			this.drawCenterCircle();
			this.createRegions();
		},
		
		drawCenterCircle: function () {
			this.centerCircle = new Kinetic.Circle({
				x: this.spots.center.x,
				y: this.spots.center.y,
				radius: Math.round(this.height / 4.5),
				fill: 'transparent',
				stroke: 'rgba(255, 255, 255, 0.5)',
				strokeWidth: 2
			});
			
			w.Soccer.Background.add(this.centerCircle);
			w.Soccer.Background.draw();
			
			this.drawCenterSpot();
		},
		
		drawCenterSpot: function () {
			this.centerSpot = new Kinetic.Circle({
				x: this.spots.center.x,
				y: this.spots.center.y,
				radius: 4,
				fill: 'rgba(255, 255, 255, 0.5)'
			});
			
			w.Soccer.Background.add(this.centerSpot);
			w.Soccer.Background.draw();
		},
		
		createRegions: function () {
			// Calculate region dimensions
			var width  = this.width / this.totalRegions.x,
			    height = this.height / this.totalRegions.y,
				left,
				top,
				region,
				rect,
				text,
				x,
				y;
				
			for (x = 0; x < this.totalRegions.x; x++) {
				for (y = 0; y < this.totalRegions.y; y++) {
					left   = x * width;
					top    = y * height;
					region = {
						left: left,
						top: top,
						right: left + width,
						bottom: top + height,
						centerX: left + (width / 2),
						centerY: top + (height / 2),
						width: width,
						height: height
					};
					
					this.regions.push(region);
				}
			}
			
			if (this.showRegions) {
				Array.each(this.regions, function (region, i) {
					rect = new Kinetic.Rect({
						x: region.left,
						y: region.top,
						width: region.width,
						height: region.height,
						fill: 'rgba(0, 0, 0, 0.2)',
						stroke: 'rgba(255, 255, 255, 0.2)',
						strokeWidth: 1
					});
				
					text = new Kinetic.Text({
						x: region.left,
						y: region.centerY - 20,
						width: region.width,
						text: i,
						fontSize: 30,
						align: 'center',
						fill: 'rgba(255, 255, 255, 0.2)'
					});
				
					w.Soccer.Background.add(rect).add(text);
					w.Soccer.Background.draw();
				}.bind(this));
			}
		},
		
		update: function () {
			
		},
		
		render: function () {
			w.Soccer.Foreground.draw();
		},
		
		setBall: function (ball) {
			this.ball = ball;
		},
		
		setRedTeam: function (team) {
			this.redTeam = team;
		},
		
		setBlueTeam: function (team) {
			this.blueTeam = team;
		},
		
		setRedGoal: function (goal) {
			this.redGoal = goal;
		},
		
		setBlueGoal: function (goal) {
			this.blueGoal = goal;
		}
		
	});
	
}(window);