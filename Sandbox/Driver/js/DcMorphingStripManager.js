/**
 * Manages the horizontal strips
 * Propagates page scroll position to them
 *
 * @author Antoine Goutenoir <antoine@goutenoir.com>
 */
DcMorphingStripManager = new Class({

  Implements: Options,

  options: {
    // Any ScrollSpy option
    scrollSpyOptions: {}
  },

  initialize: function(configuration, options) {
    this.setOptions(options);

    this.strips = new Array();

    this.setupScrollSpy();
    this.setupStrips(configuration);
  },

  setupScrollSpy: function() {
    this.scrollSpy = new ScrollSpy(this.options.scrollSpyOptions);
    this.scrollSpy.setOptions({
      onTick: this.scrollSpyOnTick.bind(this)
    });
  },

  setupStrips: function (configuration) {
    Array.each(configuration, function(item,index){
      this.setupStrip(item);
    }.bind(this));

    return this;
  },

  setupStrip: function (item) {
    var strip = new DcMorphingStrip(item.strip, item.options);
    this.strips.push(strip);

    return this;
  },

  /**
   * Callback on each ScrollSpy Tick Event
   * 
   * @param position
   * @param inside
   * @param enters
   * @param leaves
   * @param e
   */
  scrollSpyOnTick: function(position, inside, enters, leaves, e) {
    if (inside) {
      this.setStripsPropertiesValuesFromPosition (position.y);
    }
  },

  setStripsPropertiesValuesFromPosition: function (position) {
    Array.each (this.strips, function(item){
      item.setPropertiesValuesFromPosition(position);
    });

    return this;
  }

});