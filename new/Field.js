(function (w) {
	
	'use strict';
	
	w.Field = new Class({
		
		Extends: w.Base,
		
		Implements: Options,
		
		options: {
			fps: 30,
			dimensions: {x: 20, y: 10},
			meters: 42,
			showRegions: true,
			totalRegions: {x: 6, y: 3}
		},
		
		regions: [],
		
		playingArea: {},
		
		initialize: function () {
			this.draw().render();
		},
		
		draw: function () {
			// Dimensions
			this.width  = this.options.meters * this.options.dimensions.x;
			this.height = this.options.meters * this.options.dimensions.y;
			
			this.element = new Kinetic.Rect({
				x: 0,
				y: 0,
				width: this.width,
				height: this.height,
				fillPatternImage: w.Soccer.Images.background
			});
			
			w.Soccer.Background.add(this.element);
			
			// Set spots
			this.playingArea.leftTop     = {x: 0, y: 0};
			this.playingArea.rightBottom = {x: this.width, y: this.height};
			this.playingArea.center      = {x: this.width / 2, y: this.height / 2};
			
			// Draw the center circle where the kick off is
			this.drawCenterCircle();
			
			// Create regions
			this.createRegions();
			
			return this;
		},
		
		drawCenterCircle: function () {
			this.centerCircle = new Kinetic.Circle({
				x: this.playingArea.center.x,
				y: this.playingArea.center.y,
				radius: Math.round(this.height / 4.5),
				fill: 'transparent',
				stroke: 'rgba(255, 255, 255, 0.5)',
				strokeWidth: 2
			});
			
			w.Soccer.Background.add(this.centerCircle);
			
			this.drawCenterSpot();
		},
		
		drawCenterSpot: function () {
			this.centerSpot = new Kinetic.Circle({
				x: this.playingArea.center.x,
				y: this.playingArea.center.y,
				radius: 4,
				fill: 'rgba(255, 255, 255, 0.5)'
			});
			
			w.Soccer.Background.add(this.centerSpot);
			this.render();
		},
		
		createRegions: function () {
			// Calculate region dimensions
			var width  = this.width / this.options.totalRegions.x,
			    height = this.height / this.options.totalRegions.y,
				left,
				top,
				region,
				x,
				y;
				
			for (x = 0; x < this.options.totalRegions.x; x++) {
				for (y = 0; y < this.options.totalRegions.y; y++) {
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
			
			if (this.options.showRegions) {
				this.drawRegions();
			}
		},
		
		drawRegions: function () {
			var rect, text;
			
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
				this.render();
			}.bind(this));
		},
		
		update: function () {
			return this;
		},
		
		render: function () {
			w.Soccer.Background.draw();
		}
		
	});
	
}(window));