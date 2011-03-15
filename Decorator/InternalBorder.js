/**
 * Applies an Internal Border to the passed elements
 *
 * Example of use :
 *
 *  window.addEvent('load', function(){
 *    var padsInternalBorder = new InternalBorder (
 *      $$("#myFirstElement", "#myMenu li")
 *    );
 *  });
 *
 * @author  Antoine Goutenoir http://antoine.goutenoir.com
 * @require MooTools 1.2 (might work for 1.3 or later)
 */

var InternalBorder = new Class({

  Implements: [Options, Events],
  options: {
    color: {
      left   : 'white',
      right  : '#fff',
      top    : '#fff',
      bottom : '#fff'
    },
    width: {
      left   : 4,
      right  : 4,
      top    : 4,
      bottom : 4
    },
    className: 'internal_border',
    initialOpacity: 0,       // between 0 and 1
    showEvent: 'mouseenter',
    hideEvent: 'mouseleave', // set to null to desactivate
    forceHide: false         // mouseleave sometimes bug, so this option as true will SLOW DOWN the script but correct the bug
  },

  // CONSTRUCTOR
  initialize: function(elements, options){
    this.elements = $$(elements);
    this.setOptions(options);
    if (this.elements) {
      this.elements.each (this.createLayer, this);
      if (this.options.hideEvent && this.options.forceHide) {
        document.addEvent ('mouseover', function(event){
          // We check where the event takes place
          var hasChild = this.elements.hasChild($(event.target));
          hasChild.extend(this.elements.hasChild($(event.relatedTarget)));
          // If it's not amongst the children of our internal-bordered elements
          if (!hasChild.contains(true))
            this.hideLayers();
        }.bind(this));
      }
    }
  },

  // Creates the div upper layer that will contain the border
  createLayer: function(element){
    element.setStyle('position', 'relative'); // so position:absolute work
    var size = element.getSize();
    var layer = new Element ('div', {
      'class' : this.options.className,
      'styles' : {
        'border-left'   : this._generateBorderStyle('left'),
        'border-right'  : this._generateBorderStyle('right'),
        'border-top'    : this._generateBorderStyle('top'),
        'border-bottom' : this._generateBorderStyle('bottom'),
        'width'   : size.x - this.options.width.left - this.options.width.right,
        'height'  : size.y - this.options.width.top - this.options.width.bottom,
        'position': 'absolute',
        'opacity' : this.options.initialOpacity,
        'top'     : 0,
        'left'    : 0
      }
    });
    layer.internalBorder = this;
    // layer does not fire event if visibility:hidden >.<
    element.addEvent (this.options.showEvent, function(){
      this.fade ('in');
      if (this.internalBorder.options.hideEvent && this.internalBorder.options.forceHide) {
        this.internalBorder.elements.each(function(element){
          var aLayer = element.getFirst('div.'+this.internalBorder.options.className);
          if (aLayer != this) aLayer.fade('out');
        }.bind(this));
      }
    }.bind(layer));
    if (this.options.hideEvent) {
      layer.addEvent (this.options.hideEvent, function(){
        this.fade ('out');
      });
    }
    layer.inject(element, 'bottom');
  },

  // Hides all layers
  hideLayers: function(){
    this.elements.each(function(element){
      element.getFirst('div.'+this.options.className).fade('out');
    }.bind(this));
  },

  // Helper func to generate border style property
  _generateBorderStyle: function (position){
    var r = this.options.width[position] +
            'px solid ' +
            this.options.color[position];
    return r;
  }

});

/**********************************************************************************************************************/

// Example of use
//window.addEvent('load', function(){
//  var padsInternalBorder = new InternalBorder (
//    $$("#promo_pads a.padL", "#promo_pads a.padC", "#promo_pads a.padR")
//  );
//});