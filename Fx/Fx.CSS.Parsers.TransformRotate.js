/**
 * Allows for smooth Mootools Fx with rotate CSS3 property
 *
 * @origin http://b22222.com/test/testcss3.html
 * @source https://github.com/Nutellove/mootools-cloud
 * @require MooTools 1.3+
 * @licence GNU/GPL
 * @version 0.1
 */

Fx.CSS.Parsers.extend({
 
	TransformRotate: {
		parse: function(value){
			return ((value = value.match(/^rotate\((-?[0-9]{0,3})deg\)$/i))) ? value[1] : false;
		},
		compute: function(from, to, delta){
			return Math.round(Fx.compute(from, to, delta));
		},
		serve: function(value){
			return 'rotate('+value+'deg)';
		}
	}
	
});

/*
  // USAGE SNIPPETS

  // Create the FX
  var rotateFx = new Fx.Morph('myElementId', {
    duration: 4000,
    link: 'cancel',
    transition: 'elastic:out'
  });

  // In a event for example, activate the FX
  rotateFx.start({
    '-moz-transform': ['rotate(0deg)', 'rotate(360deg)'],
    '-o-transform': ['rotate(0deg)', 'rotate(360deg)'],
    '-webkit-transform': ['rotate(0deg)', 'rotate(360deg)']
  });

*/