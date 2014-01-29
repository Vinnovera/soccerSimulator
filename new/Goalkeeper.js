(function (w) {
	
	'use strict';
	
	w.Goalkeeper = new Class({
		
		Extends: w.Player,
		
		Implements: Options,
		
		options: {
			number: 1,
			name: null,
			homeRegion: null,
			
			attributes: {
				reflexes:    0,
				stamina:     0,
				pace:        0,
				agility:     0,
				precision:   0,
				skillmoves:  0,
				intercept:   0,
				positioning: 0
			},
			
			info: {
				height:     null,
				weight:     null,
				foot:       null
			}
		}
		
	});
	
}(window));