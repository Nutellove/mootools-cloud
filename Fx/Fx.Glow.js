/**
 * Creates a clone of the element and scales it to the specified value, while reducing its opacity to 0.
 * This results in a glowing effect compatible with any modern browser
 *
 * @usage
 * Single glow, default parameters :
 *
 * window.addEvent('domready', function(){
 *   document.id('myElementID').addEvent ('click', function(e){
 *     this.glow (1.5);
 *   });
 * });
 *
 * or, you can chain glows like all FXs:
 *
 * window.addEvent('domready', function(){
 *   document.id('myElementID').addEvent ('click', function(e){
 *     this.glow (1, 1.15, {
 *       duration: 150,
 *       transition: 'linear'
 *     }).chain(function(){
 *       this.glow (1, 1.5, {
 *         duration: 500,
 *         transition: 'quad:out'
 *       });
 *     }.bind(this));
 *   });
 * });
 *
 * @version : 0.2
 *
 * @param String|Element el Element on which the glow effect is applied
 *
 * @depends Fx.CSS.Parsers.TransformScale (defined below)
 *
 * @source https://github.com/Nutellove/mootools-cloud
 * @author antoine.goutenoir@gmail.com
 * @licence GNU/GPL
 *
 * @todo IE7 graceful degradation
 *       opacity start/stop
 *
 */
Fx.Glow = new Class({

  Extends: Fx,

  options: {
    position: 'below' // will determine the z-index of the clone. Other possible value : 'above'.
   ,zIndex:   2       // z-index given to the element if it has none
////// UNUSED
//    defaultGlow : {
//      delay:        0,
//      duration:     250,
//      scaleStart:   1,
//      scaleEnd:     2,
//      opacityStart: 1,
//      opacityEnd:   0
//    }
/////////////
  },

  initialize: function(element, options) {
    this.parent(options);
    this.element = document.id(element);

    this.addEvent('complete', function() {
      this.glowElement.destroy();
      this.resetGlowElement();
    });

    if (this.element.getStyle('position') == 'static') {
      this.element.setStyle('position', 'relative');
    }
    this.zIndex = this.element.getStyle('z-index');
    if (typeof this.zIndex == 'undefined' || this.zIndex == null) this.zIndex = this.options.zIndex;

    this.resetGlowElement();
  },

  resetGlowElement: function () {
    this.glowElement = this.element.clone(true, true);
    var position = this.element.getPosition();
    this.glowElement.setStyle('position', 'absolute');
    this.glowElement.setStyle('top', position.y);
    this.glowElement.setStyle('left', position.x);
    this.glowElement.setStyle('opacity', 0);
    this.glowElement.setStyle('z-index', this.zIndex + ((this.options.position=='below')?-1:1));
    this.glowElement.setStyleTransformScale(this.element.getStyleTransformScale());

    this.glowElement.inject(document.body);

    return this;
  },

  set: function (value) {
    this.glowElement.setStyle('opacity', Math.abs((this.to - value) / (this.glowDifference)));
    this.glowElement.setStyleTransformScale(value);

    return this;
  },

  start: function(from, to) {
    if (typeof to == 'undefined') {
      to = from;
      from = this.element.getStyleTransformScale();
      if (typeof from == 'undefined' || from == null || from == '') {
        from = 1;
      } else {
        from = from.toInt();
      }
    }

    if (to == from) this.glowDifference = 1;
    else            this.glowDifference = to - from;

    return this.parent(from, to);
  }

});

//// ELEMENT METHOD ////////////////////////////////////////////////////////////////////////////////////////////////////

Element.implement({

  /**
   * Creates a glow effect on the Element by cloning it and scaling its clone to the specified value whilst gradually
   * reducing its opacity to 0.
   *
   * @param from
   * @param to
   * @param options
   */
  glow: function (from, to, options) {
    if (!this.glowFx) {
      var defaultOptions = {
        // shenanigans !
      };
      this.glowFx = new Fx.Glow(this, Object.merge(defaultOptions, options));
    } else {
      this.glowFx.setOptions(options);
    }

    if (arguments.length == 1) {
      this.glowFx.start(from);
    } else {
      this.glowFx.start(from, to);
    }

    return this.glowFx;
  }

});

//// CSS3 COMPAT FOR TRANSFORM /////////////////////////////////////////////////////////////////////////////////////////

Element.implement({

  /**
   * Gets the CSS3 scale property
   * NB : may not work properly if element has rotate or skew
   * @depends Fx.CSS.Parsers.TransformScale
   */
  getStyleTransformScale: function () {
    var scale;
    if        ((scale = this.getStyle('-webkit-transform')) && scale != 'none') {
      return scale;
    } else if ((scale = this.getStyle('-moz-transform'))    && scale != 'none') {
      return scale;
    } else if ((scale = this.getStyle('-o-transform'))      && scale != 'none') {
      return scale;
    } else if ((scale = this.getStyle('transform'))         && scale != 'none') {
      return scale;
    } else {
      return 1;
    }
  },

  /**
   * Sets the CSS3 scale property to the sepcified value
   * NB : may overwrite existing rotate or skew properties
   * @param scale
   */
  setStyleTransformScale: function (scale) {
    scale = 'scale(' + scale + ')';
    this.setStyle('-webkit-transform', scale);
    this.setStyle('-moz-transform', scale);
    this.setStyle('-o-transform', scale);
    this.setStyle('transform', scale);

    return this;
  }

});

//// NEEDED CSS PARSER FOR SCALE ///////////////////////////////////////////////////////////////////////////////////////

Fx.CSS.Parsers.extend({

  TransformScale: {
    parse: function(value) {
      return ((value = value.match(/^scale\(([0-9]+\.?[0-9]*)\)$/i))) ? value[1].toFloat() : false;
    },
    compute: function(from, to, delta) {
      return Fx.compute(from, to, delta);
    },
    serve: function(value) {
      return 'scale(' + value + ')';
    }
  }

});