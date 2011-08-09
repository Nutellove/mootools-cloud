/**
 * Manages a horizontal strip
 * Propagates page scroll position to its elements if needed
 *
 * Example of stripMorph option
 *   stripMorph: {
 *     'margin-left': [
 *       { position: 0,   value: -550 },
 *       { position: 200, value: 0 }
 *     ]
 *   }
 *
 * @author Antoine Goutenoir <antoine@goutenoir.com>
 */
DcMorphingStrip = new Class({

  Implements: Options,

  options: {
    // Object of 'cssSelector': {cssProperty': {position: int, value: mixed}}
    elementsMorph: {},

    // Object of 'cssProperty': {position: int, value: mixed}
    // position = scroll position, value = cssProperty value to set for this scroll position
    stripMorph: {}
  },

  initialize: function(stripElement, options) {
    this.stripElement = document.id(stripElement);
    this.setOptions(options);

    this.morphingElements = new Array();

    this.setupStripElement();
    this.setupElements();
  },

  getId: function() {
    return this.stripElement.getProperty('id');
  },

  /**
   * Loops through all the elements that needs morphing, and ask them to update their values
   * @param position
   */
  setPropertiesValuesFromPosition: function (position) {
    Array.each(this.morphingElements, function(item){
      item.setPropertiesValuesFromPosition (position);
    });

    return this;
  },

  /**
   * Prepares the scroll morphing of the elements according to the options.elementsMorph mapping
   */
  setupElements: function() {
    Object.each(this.options.elementsMorph, function(styles,cssSelector){
      this.stripElement.getElements(cssSelector).each(function(el){
        this.morphingElements.push(new DcMorphingElement(el, styles));
      }.bind(this));
    }.bind(this));

    return this;
  },

  /**
   * Prepares the scroll morphing of the strip itself according to the options.stripMorph mapping
   */
  setupStripElement: function() {
    this.morphingStrip = new DcMorphingElement(this.stripElement, this.options.stripMorph);
    this.morphingElements.push(this.morphingStrip);

    return this;
  },

  updateMorphingElements: function() {

  }


});