/*
---
description: OverflowMarqueeInline
             This makes a div behave like a marquee on mouseover because it is too big and overflows in its parent frame.
             For when you have user-content that might be too large for the designed frame,
             you hide the overflow and show it with a marquee-like effect on a mouseover.
             It only acts like horizontal marquee, though.
             
             @param mixed  el    Element to link on
             @param string event Name of the trigger event

             @option int speed The speed of the translation animation, in pixels per second
             @option string eventStart Name of the event that starts the text translation
             @option string eventStop  Name of the event that reverts the text translation to origin

authors:
  - Antoine Goutenoir <antoine@goutenoir.com>

version: 0.3

license:
  - MIGHT-style license

requires:
  - Options
  - Fx.Tween

provides:
  - OverflowMarqueeInline
...
*/
var OverflowMarqueeInline = new Class({

  Implements: [Options],
  options: {
    speed      : 30,         // speed, in pixels/second
    eventStart : 'mouseenter',
    eventStop  : 'mouseleave'
  },

  initialize: function(el, options) {
    this.setOptions (options);
    this.el    = $(el);
    this.delta = this.el.getScrollSize().x - this.el.getSize().x;

    this.el.setStyle('white-space', 'nowrap');

    // Binding the event that will start the marquee effect if necessary
    if (this.isNeeded()) {

      // START Event
      this.el.addEvent(this.options.eventStart, function(e){
        
        this.el.get('tween').stop();
        this.setTweenDuration (this.delta + this.el.getStyle('text-indent').toInt());
        this.el.tween ('text-indent', -1 * this.delta );

      }.bind(this));

      // STOP Event
      this.el.addEvent(this.options.eventStop, function(e){

        this.el.get('tween').stop();
        this.setTweenDuration (this.el.getStyle('text-indent').toInt());
        this.el.tween ('text-indent', 0 );

      }.bind(this));
    }

    return this;
  },


  /**
   * Sets the duration of the tween animation
   * @param int distance In pixels, the crossed distance of the tween animation
   */
  setTweenDuration: function(distance) {
    var duration = Math.abs(distance) * 1000 / this.options.speed;
    this.el.set('tween', {
      'link': 'cancel',
      'transition': 'linear',
      'duration': duration
    });

    return this;
  },


  /**
   * Checks if the overflow marquee effect is needed
   */
  isNeeded: function(el) {
    if (!el) el = this.el;
    var curOverflow = el.getStyle('overflow');
    if (!curOverflow || curOverflow === "visible") el.setStyle('overflow', 'hidden');

    var isOverflowing = el.getSize().x < el.getScrollSize().x;

    el.setStyle('overflow', curOverflow);

    return isOverflowing;
  }

});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//// IMPLEMENTATION ////////////////////////////////////////////////////////////////////////////////////////////////////

Element.implement ({
  /**
   * Makes the Element behave like a marquee on mouseover if it overflows
   * @param options
   */
  overflowMarqueeInline: function(options) {
    if (!this._overflowMarqueeInline) {
      var defaultOptions = {
        // nothing is cool
      };
      this._overflowMarqueeInline = new OverflowMarqueeInline (this, Object.merge(defaultOptions, options));
    } else {
      this._overflowMarqueeInline.setOptions(options);
    }

    return this._overflowMarqueeInline;
  }
});