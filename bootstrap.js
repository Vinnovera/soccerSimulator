!function (w) {
	
	'use strict';
	
	w.Soccer = {};
	
	var preloadAssets = function (sources, callback) {
		var _this        = this,
		    loadedImages = 0,
		    numImages    = 0,
		    src;
		    
		w.Soccer.Images = {};
		    
		for (src in sources) {
			numImages += 1;
		}
		
		for (src in sources) {
			w.Soccer.Images[src] = new Image();
			
			w.Soccer.Images[src].onload = function () {
				if (++loadedImages >= numImages) {
					callback.apply(_this);
				}
			};
			
			w.Soccer.Images[src].src = sources[src];
		}
	};
	
	// Create stage
	w.Soccer.Stage = new Kinetic.Stage({
		container: 'soccer',
		width: 840,
		height: 420
	});
	
	// Create layers
	w.Soccer.Background = new Kinetic.Layer();
	w.Soccer.Foreground = new Kinetic.Layer();
	
	// Add layers to stage
	w.Soccer.Stage.add(w.Soccer.Background);
	w.Soccer.Stage.add(w.Soccer.Foreground);
	
	preloadAssets({
		background: 'assets/img/grass.png',
		ball: 'assets/img/ball.png',
		blue: 'assets/img/blue.png',
		red:  'assets/img/red.png'
	}, function () {
		
		// Create pitch
		w.Soccer.Pitch = new Pitch();
		
		// Create blue goal
		w.Soccer.BlueGoal = new Goal('blue');
		
		// Create red goal
		w.Soccer.RedGoal = new Goal('red');
		
		// Reference goals in pitch
		w.Soccer.Pitch.setBlueGoal(w.Soccer.BlueGoal);
		w.Soccer.Pitch.setRedGoal(w.Soccer.RedGoal);
		
		// Create ball
		w.Soccer.Ball = new Ball();
		
		// Reference ball in pitch
		w.Soccer.Pitch.setBall(w.Soccer.Ball);
		
		// Create blue team
		w.Soccer.BlueTeam = new Team({
			color: 'blue',
			facing: 'right'
		});
		
		// Create red team
		w.Soccer.RedTeam = new Team({
			color: 'red',
			facing: 'left'
		});
		
		// Set otherTream
		w.Soccer.BlueTeam.otherTeam = w.Soccer.RedTeam;
		w.Soccer.RedTeam.otherTeam  = w.Soccer.BlueTeam;
		
		// Reference teams in pitch
		w.Soccer.Pitch.setBlueTeam(w.Soccer.BlueTeam);
		w.Soccer.Pitch.setRedTeam(w.Soccer.RedTeam);
		
	});
	
}(window);