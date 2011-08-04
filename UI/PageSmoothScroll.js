/*
---
description: Adds smooth scrolling behavior on mousewheel, up, down, pageup, pagedown keys

authors:
  - Antoine Goutenoir <antoine@goutenoir.com>

license:
  - To georges <3

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
    this.containerHeight = this.container.getScrollSize().y;


    this.scrollFx = new Fx.Scroll (this.container, Object.merge({
      link: 'cancel',
      transition: 'expo:out',
      duration: 300,
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
      event = new Event(event);
      event.stop();
      this.updatePosition(-1 * this.options.wheelScrollStep * event.wheel);
      this.start();
    }.bind(this));

    // KEYS UP & DOWN & PGUP & PGDOWN
    this.container.addEvent('keydown', function(event){
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
    this.position = Math.min(this.position, this.containerHeight - this.windowHeight);
  },

  onResizeListener: function() {
    this.windowHeight = document.id(window).getSize().y;
  },

  start: function(position) {
    if (typeof position == 'undefined' || position == null) position = this.position;
    this.scrollFx.start(0, position);
  },

  toTop: function() {
    this.position = 0;
    this.start();
  },

  toBottom: function() {
    this.position = this.containerHeight - this.windowHeight;
    this.start();
  }




});