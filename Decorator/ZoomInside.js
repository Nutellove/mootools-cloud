/**
 * Internal Zoom Class
 * Uses CSS3 to trigger a zoom on an element without changing the element's size
 * in the page.
 *
 * Demo : http://antoine.goutenoir.com/demos/zoom-inside/
 *
 * Usage on element with id "test" :
 *
 * new ZoomInside ('#test', {
 *   // You may omit any of the following parameters, these are the default values
 *   // Coordinates of the center point on which we zoom, in percent
 *   center      : {x: 50, y: 50},
 *   // Scale of the zoom (1 = no zoom)
 *   zoomedScale  : 2,
 *   // Duration of the zoom effect, in seconds
 *   duration     : 2,
 *   // Timing function (linear, ease-in-out, any func CSS3 compatible)
 *   timingFunc   : 'cubic-bezier(0.1,0.5,0,0.9)',
 *   // Class name of the created div frame for advanced CSS Styling
 *   frameClass   : 'zoomInsideFrame',
 *   // Class name given to the element when mouse is over
 *   zoomedClass  : 'zoomInside',
 *   // Make sure the zoom stays in the original image if we put extreme values for center
 *   forceZoomIn  : true
 * });
 *
 *
 * Usage on multiple elements with default parameters :
 *
 * new ZoomInside ('a.myZoomyLinks');
 *
 * Do not forget to call ZoomInside within window.addEvent('load', function(){ ... });
 *
 * @dependency: Mootools 1.3
 * @author: Antoine Goutenoir <antoine.goutenoir@gmail.com>
 */

var ZoomInside = new Class ({

  Implements: [Options],

  options: {
    // Coordinates of the center point on which we zoom, in percent
    center       : {x:50, y:50},
    // Scale of the zoom (1 = no zoom)
    zoomedScale  : 2,
    // Duration of the zoom effect, in seconds
    duration     : 2, // In seconds
    // Timing function (linear, ease-in-out, any func CSS3 compatible)
    timingFunc   : 'cubic-bezier(0.1,0.5,0,0.9)',
    // Class name of the created div frame for advanced CSS Styling
    frameClass   : 'zoomInsideFrame',
    // Class name given to the element when mouse is over
    zoomedClass  : 'zoomInside',
    // Make sure the zoom stays in the original image if we put extreme values for center
    forceZoomIn  : true
  },

  initialize: function(elements, options){
    this.elements = $$(elements);
    this.setOptions(options);

    this.elements.each(function(element){
      this.prepareElement(element);
      this.createFrame(element);
      this.attachListeners(element);
    }.bind(this));
  },

  // Unbinds the class for the element passed
  terminate: function(element){
    element.inject(element.ziFrame,'before');
    element.ziFrame.destroy();
    element.ziFrame = null; element.ziClass = null;
    element.ziTx = null;    element.ziTy = null;
  },

  // Prepares the element passed for the class
  prepareElement: function (element) {
    // If the element already has a zoomInside, let's remove the old one
    if (element.ziClass != null) this.terminate(element);
    element.ziClass = this;

    this.addTransition(element);

    var size = element.getSize();
    var center = {
      x: this.options.center.x.toInt() * size.x / 100,
      y: this.options.center.y.toInt() * size.y / 100
    };
    var R = this.options.zoomedScale;
    var tx = R * (size.x/2 - center.x);
    var ty = R * (size.y/2 - center.y);

    if ( this.options.forceZoomIn ) {
      var R2 = (R - 1) / 2;
      element.ziTx = Math.max( Math.min(tx, size.x*R2), -size.x*R2);
      element.ziTy = Math.max( Math.min(ty, size.y*R2), -size.y*R2);
    } else {
      element.ziTx = tx;
      element.ziTy = ty;
    }
  },

  addTransition: function(element) {
    var styleValue = 'all '+this.options.duration+'s '+this.options.timingFunc;
    element.setStyles({
      '-webkit-transition': styleValue,
      '-moz-transition'   : styleValue,
      '-o-transition'     : styleValue,
      'transition'        : styleValue
    });
  },

  // Creates the frame around the element that will hide anything overflowing
  createFrame: function(element){
    var size, styles, frame;
    size   = element.getSize();
    styles = element.getStyles(
      'margin-top','margin-left','margin-right','margin-bottom'
     ,'padding-top','padding-left','padding-right','padding-bottom'
     ,'width','height'
    );
    frame = new Element ('div', {
      'class'  : this.options.frameClass,
      'styles' : {
        'width'   : size.x,
        'height'  : size.y,
        'overflow': 'hidden'
      }
    });
    this.addTransition(frame);
    element.ziFrame = frame;
    frame.ziElement = element;
    frame.wraps(element);
  },

  // Listener for the frame's mouseEnter event
  // this = element the listener is atteched to
  _mouseEnterListener: function(){
    var styleValueWeb = 'matrix('+
        this.ziClass.options.zoomedScale+', '+
        '0, 0, '+
        this.ziClass.options.zoomedScale+', '+
        this.ziTx+', '+this.ziTy+')';
    var styleValueMoz = 'matrix('+
        this.ziClass.options.zoomedScale+', '+
        '0, 0, '+
        this.ziClass.options.zoomedScale+', '+
        this.ziTx+'px, '+this.ziTy+'px)';

    this.setStyles({
      '-webkit-transform': styleValueWeb,
      '-moz-transform'   : styleValueMoz,
      '-o-transform'     : styleValueWeb,
      'transform'        : styleValueWeb
    });
    this.addClass(this.ziClass.options.zoomedClass);
    this.ziFrame.addClass(this.ziClass.options.zoomedClass);
  },

  //Listener for the frame's mouseLeave event
  // this = element the listener is atteched to
  _mouseLeaveListener: function(){
    var styleValue = 'matrix(1,0,0,1,0,0)';
    this.setStyles({
      '-webkit-transform': styleValue,
      '-moz-transform'   : styleValue,
      '-o-transform'     : styleValue,
      'transform'        : styleValue
    });
    this.removeClass(this.ziClass.options.zoomedClass);
    this.ziFrame.removeClass(this.ziClass.options.zoomedClass);
  },

  attachListeners: function(element){
    element.ziFrame.addEvent ('mouseenter', this._mouseEnterListener.bind(element));
    element.ziFrame.addEvent ('mouseleave', this._mouseLeaveListener.bind(element));
  },

  // Useless because we destroy the frame element when we unload the zoomInside Class
  detachListeners: function(element){
    element.ziFrame.removeEvent('mouseenter', this._mouseEnterListener.bind(element.ziFrame));
    element.ziFrame.removeEvent('mouseleave', this._mouseLeaveListener.bind(element.ziFrame));
  }

});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Useful shorthand alias for initialization, pass options as parameter
 * Usage :
 *   $$('.test').zoomInside({duration:3});
 */
Element.implement({
  zoomInside: function(options) {
    this.ziClass = new ZoomInside(this, options);
  }
});