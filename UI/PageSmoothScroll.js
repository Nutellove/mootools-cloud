/*
---
description: Adds smooth scrolling behavior on mousewheel, up, down, pageup, pagedown keys

authors:
  - Antoine Goutenoir <antoine@goutenoir.com>

requires:
  - Options
  - Events
  - Fx.Scroll

provides:
  - PageSmoothScroll
...
*/
var PageSmoothScroll = new Class({

	Implements: [Options, Events],

	options: {
		container: window,
    wheelScrollStep: 100,
    upScrollStep: 100,
    downScrollStep: 100,
    pageUpScrollStep: 800,
    pageDownScrollStep: 800,
    // Additional options to pass to Fx.Scroll
    scrollFxOptions: {}
	},

	initialize: function(options) {
		this.setOptions(options);
		this.container = document.id(this.options.container);

    this.position = 0; // this.container.getScroll().y is always 0

    this.scrollFxTransition = new Fx.Transition(function(pos, x){
      if (pos < 0.5) {
        return 1.5 * pos;
      } else {
        return 2*(pos-1)*(pos-1)*(pos-1) + 1;
      }
    });

    this.scrollFx = new Fx.Scroll (this.container, Object.merge({
      link: 'cancel',
      transition: this.scrollFxTransition.easeIn,
      duration: 350,
      onStart: function() {
        this.inUse = true;
      }.bind(this),
      onComplete: function(){
        this.inUse = false;
      }.bind(this)
    },this.options.scrollFxOptions));

    this.inUse = false; // mutex for usage tracking

		this.addListeners();
	},

	addListeners: function() {
    // WINDOW RESIZE
    this.onResizeListener();
    document.id(window).addEvent('load', this.onResizeListener.bind(this));
    document.id(window).addEvent('resize', this.onResizeListener.bind(this));

    // PAGE SCROLL (for when the user modifies the scroll position via scroll bar drag'n drop, and initial value)
    this.container.addEvent('scroll',function(){
      if (!this.inUse) {
        // Update position
        this.position = this.container.getScroll().y;
      }
    }.bind(this));

    // MOUSEWHEEL
    this.container.addEvent('mousewheel', function(event){
      event.stop();
      this.updatePosition(-1 * this.options.wheelScrollStep * event.wheel);
      this.start();
    }.bind(this));

    // KEYS UP & DOWN & PGUP & PGDOWN
    this.container.addEvent('keydown', function(event){
      event = new Event(event);
      if (event.key == 'up') {
        event.stop();
        this.updatePosition(-1 * this.options.upScrollStep);
      } else if (event.key == 'down') {
        event.stop();
        this.updatePosition(this.options.downScrollStep);
      } else if (event.key == 'pageup') {
        event.stop();
        this.updatePosition(-1 * this.options.pageUpScrollStep);
      } else if (event.key == 'pagedown') {
        event.stop();
        this.updatePosition(this.options.pageDownScrollStep);
      }
      this.start();
    }.bind(this));

    return this;
	},

  updatePosition: function(delta) {
    this.position += delta;
    this.position = Math.max(this.position, 0);
    this.position = Math.min(this.position, this.scrollHeight - this.windowHeight);
  },

  onResizeListener: function() {
    this.windowHeight = document.id(window).getSize().y;
    this.scrollHeight = this.container.getScrollSize().y;
  },

  start: function() {
    //if (typeof position == 'undefined' || position == null) position = this.position;
    this.scrollFx.start(0, this.position);
  },

  toTop: function() {
    this.position = 0;
    this.start();
  },

  toBottom: function() {
    this.position = this.scrollHeight - this.windowHeight;
    this.start();
  },

  up: function() {
    this.updatePosition(-2 * this.options.wheelScrollStep);
    this.start();
  },

  down: function() {
    this.updatePosition(2 * this.options.wheelScrollStep);
    this.start();
  }

});