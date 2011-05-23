/**
 * Creates a clone of the element and scales it to the specified value, while reducing its opacity to 0.
 *
 * @usage
 * Single glow, default parameters :
    window.addEvent('domready', function(){
      document.id('myElementID').addEvent ('click', function(e){
        this.glow (1.5);
      });
    });
 * or, you can chain glows like all FXs:
    window.addEvent('domready', function(){
      document.id('myElementID').addEvent ('click', function(e){
        this.glow (1, 1.15, {
          duration: 150,
          transition: 'linear'
        }).chain(function(){
          this.glow (1, 1.5, {
            duration: 500,
            transition: 'quad:out'
          });
        }.bind(this));
      });
    });
 *
 * @version : 0.1
 *
 * @param String|Element el Element on which the glow effect is applied
 *
 * @depends Fx.CSS.Parsers.TransformScale (defined below)
 *
 * @author antoine.goutenoir@gmail.com
 * @licence GNU/GPL
 *
 */
Fx.Glow = new Class({

  Extends: Fx,

  options: {
////// UNUSED
//    defaultGlow : {
//      delay:        0,
//      duration:     250,
//      scaleStart:   1,
//      scaleEnd:     2,
//      opacityStart: 1,
//      opacityEnd:   0
//    }
  },

  initialize: function(element, options)
  {
    this.parent (options);
    this.element = docuùent.id (element);

    this.addEvent('complete', function(){
      this.glowElement.destroy();
      this.resetGlowElement();
    });

    this.resetGlowElement();
  },

  resetGlowElement: function ()
  {
    this.glowElement = this.element.clone (true, true);
    var position = this.element.getPosition();
    this.glowElement.setStyle('position', 'absolute');
    this.glowElement.setStyle('top',  position.y);
    this.glowElement.setStyle('left', position.x);
    this.glowElement.setStyle('opacity', 0);
    this.setStyleTransformScale(this.getStyleTransformScale(this.element), this.glowElement);

    this.glowElement.inject(document.body);

    return this;
  },

  /**
   * Basic mutator, sets the glow fx to the specified value
   */
  set: function (value)
  {
    this.setStyleTransformScale(value, this.glowElement);

    var opacity = Math.min(1, Math.abs( (this.to - value) / (this.to - this.from) ));
    this.glowElement.setStyle('opacity', opacity);

    //console.log ('set opacity : '+opacity);
    //console.log ('set scale : '+value);

    return this;
  },

  start: function(from, to)
  {
    if (typeof to == 'undefined') {
      to = from;
      from = this.getStyleTransformScale(this.element);
      if (typeof from == 'undefined' || from == null || from == '') {
        from = 1;
      } else {
        from = from.toInt();
      }
    }

    return this.parent (from, to);
  },

//// UGLY STYLE MUTACCESSORS ///////////////////////////////////////////////////////////////////////////////////////////

  getStyleTransformScale: function (element)
  {
    if (typeof element == 'undefined' || element == null) element = this.element;
    var scale;
    if ((scale = element.getStyle('-webkit-transform')) && scale != 'none') {
      //console.log ('gSTS : '+scale);
      return scale;
    } else if ((scale = element.getStyle('-moz-transform')) && scale != 'none') {
      //console.log ('gSTS2 : '+scale);
      return scale;
    } else if ((scale = element.getStyle('-o-transform')) && scale != 'none') {
      //console.log ('gSTS3 : '+scale);
      return scale;
    } else if ((scale = element.getStyle('transform')) && scale != 'none') {
      //console.log ('gSTS4 : '+scale);
      return scale;
    } else {
      return 1;
    }
  },

  setStyleTransformScale: function (scale, element)
  {
    if (typeof element == 'undefined' || element == null) element = this.element;

    scale = 'scale('+scale+')';
    element.setStyle('-webkit-transform', scale);
    element.setStyle('-moz-transform', scale);
    element.setStyle('-o-transform', scale);
    element.setStyle('transform', scale);

    return this;
  }

});

//// ELEMENT METHOD ////////////////////////////////////////////////////////////////////////////////////////////////////

Element.implement ({

  glow: function (from, to, options)
  {
    if (!this.glowFx) {
      var defaultOptions = {
        // shenanigans !
      };
      this.glowFx = new Fx.Glow (this, Object.merge(defaultOptions, options));
    } else {
      this.glowFx.setOptions(options);
    }

    if (arguments.length == 1) {
      this.glowFx.start (from);
    } else {
      this.glowFx.start (from, to);
    }

    return this.glowFx;
  }

});

//// NEEDED CSS PARSER FOR SCALE ///////////////////////////////////////////////////////////////////////////////////////

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