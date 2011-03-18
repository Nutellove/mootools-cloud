/**
 * Make a number to smoothly change from one value to another
 *
 * Example usage :
 *
 *  var tickerFx = new Fx.Ticker ('results_count', {
 *    duration: 4500,
 *    transition: 'quad:out',
 *    link: 'cancel'
 *  });
 *  tickerFx.start(0,100);
 */
Fx.Ticker = new Class({

  Extends: Fx,

  initialize: function(element, options)
  {
    this.parent(options);
    this.element = document.id(element);
  },

  set: function(value)
  {
    this.element.set('text', value.round());
    return this;
  }

});