/*
---
description: Absolutify
             Makes the passed elements become absolute and wraps them in a container so that their visual appearance
             does not change. This script is useful when you have an absolute-positioned design layer
             and you want a few elements below to still react to mouse events.

             BEWARE :
               - Weird fix for firefox buggy onLoad window Event (???)
               - Ugly fix for IE element width (incrementing wrapper's width by 1)

authors:
  - Antoine Goutenoir <antoine@goutenoir.com>

license:
  - Absolute licence

requires:
  - Options

provides:
  - Absolutify
...
*/
Absolutify = new Class({

  Implements: [Options],

  options: {
    // Default zIndex to bring the elements to
    zIndex: 42,
    // Default class to give to the relative-positioned wrappers
    wrapperClass: '',
    // Shall we use the ugly IE fix (incrementing width by 1) ?
    useUglyIEFix: true
  },

  initialize: function (elements, options) {
    this.elements = $$(elements);
    this.setOptions(options);

    // Weird fix, onLoad event does not bubble correctly on ffx !?
    var loadEvent = 'load';
    if (Browser.firefox) loadEvent = 'domready';

    window.addEvent(loadEvent, function(){
      this.elements.each(function(element){
        this.absolutifyElement(element);
      }.bind(this));
    }.bind(this));
  },

  /**
   * Builds a wrapper around the element, and try to make it invisible
   * @param element
   */
  absolutifyElement: function(element) {
    var styles = element.getStyles('position','float','top','left','margin');
    var coords = element.getCoordinates();

    if (styles.position != 'absolute') {

      var wrapper = new Element('div',{
        'styles': {
          'position': 'relative',
          'float':    styles.float,
          'top':      styles.top,
          'left':     styles.left,
          'margin':   styles.margin,
          'padding':  0,
          'border':   0,
          'width':    (!Browser.ie||!this.options.useUglyIEFix) ? coords.width : coords.width+1,
          'height':   coords.height
        },
        'class': this.options.wrapperClass
      });
      wrapper.wraps(element);
      element.setStyles({
        'position': 'absolute',
        'top':  0,
        'left': 0,
        'margin': 0,
        'z-index': this.options.zIndex
      });
      
    }

    return this;
  }

});