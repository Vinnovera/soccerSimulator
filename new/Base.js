(function (w) {
	
	'use strict';
	
	w.Base = new Class({
		
		Implements: [Events, Options],
		
		set: function (what, value) {
			this.options[what] = value;
			
			this.fireEvent('update', [what, value]);
			this.fireEvent('update:' . what, value);
		},
		
		get: function (what) {
			return this.options[what];
		}
		
	});
	
}(window));