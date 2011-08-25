/*
---

description: Make a number in the innerText of a DOM Element smoothly change from one value to another

authors:
  - Antoine Goutenoir <antoine@goutenoir.com>

demo:
  - http://jsfiddle.net/goutte/K6R8k/

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
    transformer: function(i){return i}
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


Element.Properties.ticker = {

	set: function(options){
		var ticker = this.retrieve('ticker');
		if (ticker) ticker.destroy();
		return this.eliminate('ticker').store('ticker:options', options);
	},

	get: function(){
		var ticker = this.retrieve('ticker');
		if (!ticker){
			ticker = new Fx.Ticker(this, this.retrieve('ticker:options'));
			this.store('ticker', ticker);
		}
		return ticker;
	}

};


Element.implement({

	ticker: function(to, options){
		if (options) this.set('ticker', options);
		this.get('ticker').start(to);
		return this;
	}

});