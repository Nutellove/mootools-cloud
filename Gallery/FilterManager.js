/*
---
description: FilterManager v1.2
             Manages the handles that will filter the container's elements
             The rel attribute of the handle must match the class of an element for this element to be shown
             If the rel is empty, all elements are shown

authors:
  - Antoine Goutenoir <antoine@goutenoir.com>

license:
  - MIGHT-style license

requires:
  - Core/Options
  - Core/Events

provides:
  - FilterManager
...
*/
FilterManager = new Class({

  Implements: [Options, Events],

  options: {
    handleActivationEvent: 'click',
    handleActivatedClass:  'active',
    handleEmptyClass:      'empty',
    handleTaggingProperty: 'rel',
    stopEventPropagation:   true // Stops propagation on the handle activation event
    //onBeforeHide: Function.from
    //onAfterHide:  Function.from
    //onBeforeShow: Function.from
    //onAfterShow:  Function.from
  },

  initialize: function (container, handles, options) {
    this.container = document.id(container);
    this.handles   = $$(handles);
    this.setOptions(options);

    this.allElements = this.container.getChildren();

    this.addHandlesBehavior();
  },

  addHandlesBehavior: function () {
    var that = this;
    this.handles.each(function(handle){
      // Attach the activation event
      handle.addEvent(this.options.handleActivationEvent, function(event){
        if (that.options.stopEventPropagation) event.stop();
        if (!this.hasClass(that.options.handleActivatedClass) && !this.hasClass(that.options.handleEmptyClass)) {
          var rel = this.getProperty(that.options.handleTaggingProperty);
          that.filterContent (rel);
          if (that.options.handleActivatedClass) {
            that.handles.removeClass(that.options.handleActivatedClass);
            this.addClass(that.options.handleActivatedClass);
          }
        }
      });
      // Add the handleEmptyClass if necessary
      if (this.options.handleEmptyClass &&
          !this.hasContentForTagExpression(handle.getProperty(this.options.handleTaggingProperty)))
      {
        handle.addClass(this.options.handleEmptyClass);
      }
    }.bind(this));

    return this;
  },

  filterContent: function (tagExpression) {
    // Get elements that pass the tagExpression filtering
    var elementsToShow = this.getContentForTagExpression(tagExpression);
    // Hide all elements except those that pass
    var elementsToHide = this.allElements.filter(function(item){return !elementsToShow.contains(item)});
    // Fire onBeforeHide Event
    this.fireEvent('beforeHide');
    // Hide elements that don't pass the filtering
    this.hideElements(elementsToHide);
    // Fire onAfterHide Event
    this.fireEvent('afterHide');
    // Fire onBeforeShow Event
    this.fireEvent('beforeShow');
    // Show elements that pass the filtering
    this.showElements(elementsToShow);
    // Fire onAfterShow Event
    this.fireEvent('afterShow');
  },

  getContentForTagExpression: function (tagExpression) {
    var elements;
    if (tagExpression == null) {
      // If empty, get all
      elements = this.allElements;
    } else {
      // Else, get elements that pass the filtering
      elements = this.getContentForTag(tagExpression);
    }

    return elements;
  },

  getContentForTag: function (tag) {
    return this.container.getChildren('.'+tag);
  },

  hasContentForTagExpression: function (tagExpression) {
    return (this.getContentForTagExpression(tagExpression).length > 0);
  },

  hideElements: function (elements) {
    elements.setStyle('display', 'none');
  },

  showElements: function (elements) {
    elements.setStyle('display', 'block');
  }

});