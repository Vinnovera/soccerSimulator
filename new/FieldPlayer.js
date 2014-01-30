(function (w) {
	
	'use strict';
	
	w.FieldPlayer = new Class({
		
		Extends: w.Player,
		
		Implements: Options,
		
		options: {
			number: 1,
			name: null,
			homeRegion: null,
			
			attributes: {
				strength:   0,
				stamina:    0,
				pace:       0,
				agility:    0,
				precision:  0,
				defense:    0,
				attack:     0,
				skillmoves: 0,
				intercept:  0
			},
			
			info: {
				height:     null,
				weight:     null,
				foot:       null,
				mentality:  null
			}
		},
		
		update: function () {
			
		}
		
	});
	
}(window));