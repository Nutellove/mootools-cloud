/*
---
description: FilterManager v1.1
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
    handleTaggingProperty: 'rel'
    //onBeforeHide: Function.from
    //onAfterHide:  Function.from
    //onBeforeShow: Function.from
    //onAfterShow:  Function.from
  },

  initialize: function (container, handles, options) {
    this.container = document.id(container);
    this.handles   = $$(handles);
    this.setOptions(options);

    this.addHandlesBehavior();
  },

  addHandlesBehavior: function () {
    var that = this;
    this.handles.each(function(handle){
      handle.addEvent(this.options.handleActivationEvent, function(event){
        if (!this.hasClass(that.options.handleActivatedClass)) {
          var rel = this.getProperty(that.options.handleTaggingProperty);
          that.filterContent (rel);
          that.handles.removeClass(that.options.handleActivatedClass);
          this.addClass(that.options.handleActivatedClass);
        }
      });
    }.bind(this));

    return this;
  },

  filterContent: function (tagExpression) {
    // Get elements that pass the filtering
    var elementsToShow = this.getContentForTag(tagExpression);
    // Hide all elements except those that pass
    var allElements = this.container.getChildren();
    var elementsToHide = allElements.filter(function(item){return !elementsToShow.contains(item)});
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

  getContentForTag: function (tag) {
    return this.container.getChildren('.'+tag);
  },

  hideElements: function (elements) {
    elements.addClass('hidden');
  },

  showElements: function (elements) {
    elements.removeClass('hidden');
  }

});