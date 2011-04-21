/**
 * This makes a div behave like a marquee on mouseover because it is too big and overflows in its parent frame.
 * For when you have user-content that might be too large for the designed frame, you hide the overflow and show it
 * with a marquee-like effect on a mouseover.
 * It only acts like horizontal marquee, though.
 *
 * @version : 0.1
 *
 * @param mixed  el    Element to link on
 * @param string event Name of the trigger event
 *
 * @option int speed The speed of the translation animation, in pixels per second
 * @option string eventStart Name of the event that starts the text translation
 * @option string eventStop  Name of the event that reverts the text translation to origin
 *
 * @author antoine.goutenoir@gmail.com
 * @require MooTools 1.3.*
 * @licence GNU/GPL
 * 
 */
var OverflowMarquee = new Class({
  Implements: [Options],

  options: {
    speed      : 30,         // in pixels/second
    eventStart : 'mouseenter',
    eventStop  : 'mouseleave'
  },

  initialize: function(el, options) {
    this.setOptions (options);
    this.el    = $(el);
    this.frame = this.el.getParent();
    this.busy  = false;

    // Binding the event that will start the marquee effect if necessary
    if (this.isNeeded()) {
      this.prepareElements();

      // START Event
      this.el.addEvent(this.options.eventStart, function(e){

        var left = this.el.getScrollSize().x - this.frame.getSize().x;
        this.setTweenDuration (left + this.el.getStyle('left').toInt());
        this.el.tween ('left', -1 * left );

      }.bind(this));

      // STOP Event
      this.el.addEvent(this.options.eventStop, function(e){

        this.setTweenDuration (this.el.getStyle('left').toInt());
        this.el.tween ('left', 0);

      }.bind(this));
    }
  },

  /**
   * Prepares the CSS of the element
   */
  prepareElements: function() {
    this.el.setStyle('position', 'relative');
    this.el.setStyle('left', 0);
    this.el.setStyle('white-space', 'nowrap');

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
    if (el == null) {
      el = this.el;
    }
    return OverflowMarquee.isNeeded(el);
  }

});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//// STATIC METHODS ////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Static method returning if overflowmarquee is needed on the passed element
 * @param  Element el
 * @return boolean
 */
OverflowMarquee.isNeeded = function (el) {
  if (el.getParent().getSize().x < el.getScrollSize().x ||
      el.getParent().getSize().y < el.getScrollSize().y) {
    return true;
  } else {
    return false;
  }
}