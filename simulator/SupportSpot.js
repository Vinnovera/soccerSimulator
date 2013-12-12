!function (w) {
	
	'use strict';
	
	w.SupportSpotCalculator = new Class({
		
		canPassScore:                   2.0,
		canScoreFromPositionScore:      1.0,
		distFromControllingPlayerScore: 2.0,
		bestSupportingSpot:             null,
		
		determineBestSupportPosition: function () {
			// Don't check on every frame
			if (false) {
				return this.bestSupportingSpot;
			}
			
			// Reset supporting spot
			this.bestSupportingSpot = null;
			
			var bestScore = 0.0, currentSpot;
			
			// Loop through all spots to add a score of 1.0
			// This way, all spots are available to the player
			for () {
				
			}
		}
		
	});
	
}(window);