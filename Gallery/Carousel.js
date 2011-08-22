/*
---
description: Carousel, a simple but effective horizontal carousel

version: 1.4

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
    prevButton: null, // id or Element of the prev button
    nextButton: null, // id or Element of the next button
    disabledClass: 'disabled', // Class to give to the next/prev buttons when we're at extrema
    counterTotal:   null, // id or Element of the holder of the total number of pages
    counterCurrent: null, // id or Element of the holder of the current page number
    useTween: true, // if false, will use a setStyle (if you used CSS3 transitions)
    nbOfRowsPerPage: 1,
    nbOfColsPerPage: 1,
    reorderElements: true // will tally dummies and reorder elements if nbOfRows > 1
    // onFirst: Function.from
    // onLast:  Function.from
    // onPrev:  Function.from
    // onNext:  Function.from
  },

  initialize: function(carousel, options) {
    this.setOptions(options);
    this.container = document.id(carousel);
    this.frame = this.container.getParent();
    this.elements = this.container.getChildren();

    this.elementWidth = this.elements[0].getSize().x
                      + this.elements[0].getStyle('margin-left').toInt()
                      + this.elements[0].getStyle('margin-right').toInt() ;

    this.pageWidth = this.elementWidth * this.options.nbOfColsPerPage;
    this.elementsPerPage = this.options.nbOfRowsPerPage * this.options.nbOfColsPerPage;

    this.currentPage = 1;
    this.totalPages = Math.ceil(this.countElements() / this.elementsPerPage);

    this.container.setStyle('width', this.pageWidth * this.totalPages);

    if (this.options.reorderElements) this.reorderElements();

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
    if (page == 1) {
      if (this.options.prevButton) document.id(this.options.prevButton).addClass(this.options.disabledClass);
      this.fireEvent('first');
    }

    // If we're at the last page
    if (page == this.totalPages) {
      if (this.options.nextButton) document.id(this.options.nextButton).addClass(this.options.disabledClass);
      this.fireEvent('last');
    }
  },

  setContainerPropertyToPage: function (page) {
    var value = (1 - page) * this.pageWidth;
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
      this.fireEvent('prev');
    }
  },

  prevButtonOnClick: function() {
    this.prevPage();
  },

  nextPage: function() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.goToPage(this.currentPage);
      this.fireEvent('next');
    }
  },

  nextButtonOnClick: function() {
    this.nextPage();
  },

  reorderElements: function() {
    var cols = this.options.nbOfColsPerPage;
    var rows = this.options.nbOfRowsPerPage;

    if (rows < 2) return this;

    var s = this.elements.length;
    var nbDummies = ((rows * cols) - (s % (rows * cols))) % (rows * cols);
    var n;

    // Tally dummy elements
    if (nbDummies > 0) {
      var dummy;
      for (var k = 0; k < nbDummies; k++) {
        dummy = this.elements[0].clone();
        dummy.setStyle('visibility', 'hidden');
        this.elements.push(dummy);
      }
      s += nbDummies;
    }

    var newOrder = [];

    this.elements.each(function(el, i) {
      n = Math.floor(i/(rows*cols)) * cols + Math.floor(i/cols)%rows * (cols*this.totalPages) + i%cols; // ;)
      newOrder[n] = el;
    }.bind(this));

    this.elements = newOrder;

    this.elements.each(function(el) {
      el.inject(this.container);
    }.bind(this));

    return this;
  }


});