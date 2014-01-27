!function (w) {
	
	'use strict';
	
	w.FieldPlayer = new Class({
		
		Extends: w.Player,
		
		Implements: Options,
		
		update: function () {
			
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
		
		isClosestToBall: function () {
			
		}
		
	});
	
}(window);