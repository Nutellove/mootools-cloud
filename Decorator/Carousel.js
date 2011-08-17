/*
---
description: Carousel, a simple but effective horizontal carousel

authors:
  - Antoine Goutenoir <antoine@goutenoir.com>

license:
  - MIGHT-style license

requires:
  - Options
  - Events
  - Fx.Tween

provides:
  - Carousel
...
*/
var Carousel = new Class({

	Implements: [Options, Events],

	options: {
    prevButton: null, // id or Element of the previous button
    nextButton: null, // id or Element of the next button
    disabledClass: 'disabled', // Class to give to the next/prev buttons when we're at extrema
    counterTotal:   null, // id or Element of the holder of the total number of pages
    counterCurrent: null, // id or Element of the holder of the current page number
    useTween: true // if false, will use a setStyle (if you used CSS3 transitions)
    // onFirst: Function.from
    // onLast:  Function.from
	},

	initialize: function(carousel, options) {
    this.setOptions(options);
    this.container = document.id(carousel);
    this.frame = this.container.getParent();
    this.elements = this.container.getElements('article');

    this.stepSize = this.elements[0].getSize().x;
    this.elementsPerPage = Math.floor(this.frame.getSize().x / this.stepSize);

    this.currentPage = 1;
    this.totalPages = Math.ceil(this.countElements() / this.elementsPerPage);

    this.container.setStyle('width', this.stepSize * this.countElements());

    if (this.options.counterTotal) {
      document.id(this.options.counterTotal).set('text', this.totalPages);
    }
    if (this.options.counterCurrent) {
      document.id(this.options.counterCurrent).set('text', this.currentPage);
    }

    if (this.options.nextButton) {
      document.id(this.options.nextButton).addEvent('click', this.nextButtonOnClick.bind(this));
    }
    if (this.options.prevButton) {
      document.id(this.options.prevButton).addEvent('click', this.prevButtonOnClick.bind(this));
    }
  },

  countElements: function() {
    return this.elements.length;
  },

  goToPage: function(page) {
    this.setContainerPropertyToPage(page);

    // Update counter
    if (this.options.counterCurrent) document.id(this.options.counterCurrent).set('text', this.currentPage);

    // Re-enable buttons
    if (this.options.prevButton) document.id(this.options.prevButton).removeClass(this.options.disabledClass);
    if (this.options.nextButton) document.id(this.options.nextButton).removeClass(this.options.disabledClass);

    // If we're at the first page
    if ( page == 1 ) {
      if (this.options.prevButton) document.id(this.options.prevButton).addClass(this.options.disabledClass);
      this.fireEvent('first');
    }

    // If we're at the last page
    if ( page == this.totalPages ) {
      if (this.options.nextButton) document.id(this.options.nextButton).addClass(this.options.disabledClass);
      this.fireEvent('last');
    }
  },

  setContainerPropertyToPage: function (page) {
    var value = (1 - page) * this.stepSize * this.elementsPerPage;
    if (this.options.useTween) {
      this.container.tween('margin-left', value);
    } else {
      this.container.setStyle('margin-left', value);
    }
  },

  prevPage: function() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.goToPage(this.currentPage);
    }
  },

  prevButtonOnClick: function() {
    this.prevPage();
  },

  nextPage: function() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.goToPage(this.currentPage);
    }
  },

  nextButtonOnClick: function() {
    this.nextPage();
  }


});