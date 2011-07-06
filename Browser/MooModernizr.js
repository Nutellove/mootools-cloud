/**
 * 
 * MooModernizr 1.2
 * Compatible with Mootools 1.3.2 without backwards compatibility
 * 
 * @author Arian Stolwijk
 * @contributor Antoine Goutenoir <antoine@goutenoir.com>
 *
 * @license MIT
 * 
 */

// These are the original notes of the original author

/**
 * Modernizr JavaScript library 1.1
 * http://modernizr.com/
 *
 * Copyright (c) 2009 Faruk Ates - http://farukat.es/
 * Licensed under the MIT license.
 * http://modernizr.com/license/
 *
 * Featuring major contributions by
 * Paul Irish  - http://paulirish.com
 * Ben Alman   - http://benalman.com/
 *
 * Modernizr is a script that will detect native CSS3 and HTML5 features
 * available in the current UA and provide an object containing all
 * features with a true/false value, depending on whether the UA has
 * native support for it or not.
 * 
 * In addition to that, Modernizr will add classes to the <html>
 * element of the page, one for each cutting-edge feature. If the UA
 * supports it, a class like "cssgradients" will be added. If not,
 * the class name will be "no-cssgradients". This allows for simple
 * if-conditionals in CSS styling, making it easily to have fine
 * control over the look and feel of your website.
 * 
 * @author    Faruk Ates
 * @copyright   (2009) Faruk Ates.
 *
 * @contributor   Paul Irish
 * @contributor   Ben Alman
 *
 */


(function(){
	
	var m = new Element('mooModernizr'),
		  f = new Element('input'), // input types check
	
	// Private funtion
	// Loop through all possible properties and see if we get a valid response at all
	checkProps = function(prop){
		var i = 0;
		for (i in prop) {
			if (getCss(prop[i]) != undefined) {
				return prop[i];
			}
		}
		return false;		
	},
	
	/**
	 * @return {Array} The javascript style properties (e.g. MozBackgroundImage)
	 * @param {String} prop Property
	 * @param {Array|String} extend Properties to append to the list
	 */
	getPropsAll = function(prop,extend){

		var uc_prop = prop.replace(/./, function(a) {
			return a.toUpperCase(); 
		}),
		props = mooModernizr.prefixes.map(function(e){
			return e+uc_prop;
		}).include(prop);
		if(extend){
			if(typeOf(extend) != 'array') extend = [extend];
      Object.append(props,extend);
		}
		return props;
	},
	
	setCss = function(str){
		m.style.cssText = str;
	},
	
	setCssAll = function(str1,str2){
		str1 += ';';
		return setCss(
			str1
			+ mooModernizr.prefixes.map(function(pre){
				return '-'+pre+'-';
			}).join(str1)
			+ ( str2 || '' )
		);
	},
	
	getCss = function(prop){
		prop = prop ? prop : 'cssText';
		return (m.style[prop] != undefined) ? m.style[prop] : null;
	};

	// Public functions
	this.mooModernizr = {
		
		// Check if an input type exists
		inputtype: function(type){
			f.setAttribute('type',type);
			return !!(f.type !== 'text');
		},
		
		// Prefixes for various browsers
		prefixes: 'o moz Moz ms webkit'.split(' ')
		
/* Not necessary yet
		// Check if an event is supported, used for draganddrop
		isEventSupported: function(eventName, element) {
			element = element || new Element('div');
			eventName = 'on' + eventName;
			
			// When using `setAttribute`, IE skips "unload", WebKit skips "unload" and "resize"
			// `in` "catches" those
			var isSupported = (eventName in element);
			
			if (!isSupported && element.setAttribute) {
				element.setAttribute(eventName, 'return;');
				isSupported = typeof element[eventName] == 'function';
			}
			
			element = null;
			return isSupported;
		}  
*/			
	};
	
	// The features hash holds all the tests
	var features = new Hash({
		
		/**
		 * @return {Bool}
		 */
		canvas: (function(){
			return !!new Element('canvas').getContext;
		})()
		
	});
	
	// The features hash is extended so canvastext can access features.canvas		
	Object.append(features,{

		/**
		 * @return {Bool}
		 */
		canvastext: !!(features.canvas && typeof new Element('canvas').getContext('2d').fillText == 'function'),
		
		/**
		 * geolocation tests for the new Geolocation API specification.
		 *   This test is a standards compliant-only test; for more complete
		 *   testing, including a Google Gears fallback, please see
		 *   
		 *   http://code.google.com/p/geo-location-javascript/
		 * 
		 * @return {Bool}
		 */
		geolocation: !!navigator.geolocation,
		
		/**
		 * @return {Bool}
		 */
		rgba: (function(){
			// Set an rgba() color and check the returned value
			setCss('background-color: rgba(150,255,150, .5)');
			return getCss('backgroundColor').contains('rgba');
		})(),
		
		/**
		 * @return {Bool}
		 */
		hsla: (function(){
			// Same as rgba(), in fact, browsers re-map hsla() to rgba() internally
			setCss('background-color: hsla(120,40%,100%, .5)');
			return getCss('backgroundColor').contains('rgba');
		})(),
		
		/**
		 * @return {Bool}
		 */
		multiplebgs: (function(){
			// Setting multiple images and a color on the background shorthand property
			//  and then querying the style.background property value for the number of
			//  occurrences of "url(" is a reliable method for detecting ACTUAL support for this!
			setCss('background: url(m.png), url(a.png), #f99 url(m.png)');
		
			// If the UA supports multiple backgrounds, there should be three occurrences
			//	of the string "url(" in the return value for elem_style.background
			
			return /(url\s*\(.*?){3}/.test(getCss('background'));
		})(),
		
		/**
		 * @return {Bool}
		 */
		opacity: (function(){
			// Browsers that actually have CSS Opacity implemented have done so
			//  according to spec, which means their return values are within the
			//  range of [0.0,1.0] - including the leading zero.
			setCss('opacity: .5');
			return getCss('opacity').contains('0.5');
		})(),
				
		/**
		 * @return {Bool}
		 */
		cssgradients: (function(){
			/**
			 * For CSS Gradients syntax, please see:
			 * http://webkit.org/blog/175/introducing-css-gradients/
			 * https://developer.mozilla.org/en/CSS/-moz-linear-gradient
			 * https://developer.mozilla.org/en/CSS/-moz-radial-gradient
		  	 * http://dev.w3.org/csswg/css3-images/#gradients-
			 */
			
			var str1 = 'background-image:',
				str2 = 'gradient(linear,left top,right bottom,from(#9f9),to(white));',
				str3 = 'linear-gradient(left top,#9f9, white);';

			setCss(
				str1 + str2
				+ str1 + str3
				+ mooModernizr.prefixes.map(function(pre){
					return str1+'-'+pre+'-'+str2 
					+ str1 + pre + str3;
				})
			);
			return getCss('backgroundImage').contains('gradient');
		})()
	});
	
	// A normalized method to check if a css property exists
	// value can be the property or an array with the property
	// and a custom css string [property, css string]
	var checkCSS3 = function(value){
		var arr = typeOf(value) == 'array' ? value : [value];
		if((arr[1] != undefined)) setCssAll(arr[1]);
    if (typeOf(arr[0]) != 'array') arr[0] = [arr[0]];
		return checkProps(getPropsAll.apply(null,arr[0]));
	};

	// Add the CSS3 tests to the features
	/*
	 * Each test can contain a string, the property or 
	 * an array, [property, css string]
	 */
	Object.append(features,
		new Hash({
			borderimage: 'borderImage',
			borderradius: 'borderRadius',
			boxshadow: 'boxShadow',
			textshadow: 'textShadow',
			cssanimations: 'animationName',
			csscolumns: 'columnCount',
			cssreflections: 'boxReflect',
			csstransforms: [['Transform','transformProperty']],
			csstransforms3d: [['Perspective','perspectiveProperty']],
			csstransitions: 'transitionProperty'
		}).map(checkCSS3)
	);
	
	Object.append(features,{
						
		// These tests evaluate support of the video/audio elements, as well as
		// testing what types of content they support.
		//
		// we're using the Boolean constructor here, so that we can extend the value
		// e.g.  !!Browser.Features.video     // true
		//       Browser.Features.video.ogg // 'probably'
		//
		// codec values from : http://www.w3.org/TR/html5/video.html#the-source-element
		//                     http://www.ietf.org/rfc/rfc4281.txt
		
		/**
		 * @return {Bool|Object} If video is supported, also check the playtypes ogg/mp4
		 */
		video: (function(){
			var v = new Element('video');
			var video = v.canPlayType ? new Hash() : false;
			if(video){
				Object.append(video,{
					ogg: v.canPlayType('video/ogg; codecs="theora, vorbis"'),
					h264: v.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"')
				});
				return video;
			}
			return false;
		})(),
		
		/**
		 * @return {Bool|Object}
		 */
		audio: (function(){
			var a = new Element('audio');
			var audio = a.canPlayType ? new Hash() : false;
			if(audio){
				Object.append(audio,{
					ogg: a.canPlayType('audio/ogg; codecs="vorbis"'),
					wav: a.canPlayType('audio/wave'),
					mp3: a.canPlayType('audio/mpeg3;'),
					m4a: a.canPlayType('audio/x-m4a;')
				});
				return audio;
			}
			return false;
		})(),

		// both localStorage and sessionStorage are
		// tested in this method because otherwise Firefox will
		//   throw an error: https://bugzilla.mozilla.org/show_bug.cgi?id=365772
		// if cookies are disabled

		localstorage: !!('sessionStorage' in window),
		
		sessionstorage: !!('sessionStorage' in window),
		
		webworkers: !!window.Worker,

		applicationcache:  !!window.applicationCache,

		offlinedetection: !!navigator.onLine,
				
/*		draganddrop: function() {
			var events = 'drag dragstart dragenter dragover dragleave dragend drop'.split(' '),
			supported = true;
			events.each(function(e){
				supported = supported && mooModernizr.isEventSupported(e);
			});
			return supported;
		},

		hashchange: mooModernizr.isEventSupported('hashchange', document.body),
*/
		postmessage: !!window.postMessage,
		
		webdatabase: !!window.openDatabase,
						
		query: !!(document.querySelector),
		
		json: !!(window.JSON),
		
		inputtypes: (function(props) {
			var inputs = {}, supported = false;
			props.each(function(type){
				inputs[type] = mooModernizr.inputtype(type);
				supported = supported || inputs[type];
			});
			return supported ? inputs : false;
		})('search tel url email datetime date month week time datetime-local number range color'.split(' ')),
		
		inputattributes: (function(props){
			var attrs = {}, supported = false;
			props.each(function(attr){
				attrs[attr] = !!(attr in f);
				supported = supported || attrs[attr];
			});
			return supported ? attrs : false;			
		})('autocomplete autofocus list placeholder max min multiple pattern required step'.split(' '))
		
	});

	// Extend the browser features object
	Object.append(Browser.Features,features);

	// Clean css
	setCss('');

})();