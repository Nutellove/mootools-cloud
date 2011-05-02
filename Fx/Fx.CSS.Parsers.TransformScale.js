/**
 * Allows for smooth Mootools Fx with transform scale CSS3 property
 *
 */

Fx.CSS.Parsers.extend({

	TransformScale: {
		parse: function(value){
			return ((value = value.match(/^scale\(([0-9]+\.?[0-9]*)\)$/i))) ? value[1] : false;
		},
		compute: function(from, to, delta){
			return Fx.compute(from, to, delta);
		},
		serve: function(value){
			return 'scale('+value+')';
		}
	}

});

/*
  // USAGE SNIPPETS

  // Create the FX
  var scaleFx = new Fx.Morph('myElementId', {
    duration: 4000,
    transition: 'elastic:out'
  });

  // In a event for example, activate the FX
  scaleFx.start({
    '-moz-transform': ['scale(1)', 'scale(0.5)'],
    '-o-transform': ['scale(1)', 'scale(0.5)'],
    '-webkit-transform': ['scale(1)', 'scale(0.5)']
  });

*/