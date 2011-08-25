/**
 * Example usage :
 *
 *  var tickerFx = new Fx.Ticker ('results_count', {
 *    duration: 4500,
 *    transition: 'quad:out',
 *    link: 'cancel'
 *  });
 *  tickerFx.start(0,100);
 *  or
 *  tickerFx.start(100); // from parameter is optional
 */

/*
---

description: Make a number in the innerText of a DOM Element smoothly change from one value to another

authors:
  - Antoine Goutenoir <antoine@goutenoir.com>

licence:
  - free speech

requires:
  - Fx

provides:
  - Fx.Ticker
  - Element.ticker

...
*/
Fx.Ticker = new Class({

  Extends: Fx,

  options: {
    // Function to mutate the value just before it is printed
    transformer: Function.from()
  },

  initialize: function(element, options) {
    this.parent(options);
    this.element = document.id(element);
  },

  set: function(value) {
    this.element.set('text', this.options.transformer(value.round()));
    return this;
  },

  start: function(from, to) {
    if (typeof to == 'undefined') {
      to = from;
      from = this.element.get('text');
      if (typeof from == 'undefined' || from === null || from === '') {
        from = 0;
      } else {
        from = from.toInt();
      }
    }
    return this.parent (from, to);
  }

});