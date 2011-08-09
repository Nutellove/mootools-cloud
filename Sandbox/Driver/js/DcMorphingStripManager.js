/**
 * Manages the horizontal strips
 * Propagates page scroll position to them
 *
 * WARNING : There is some code specific to DRIVER TRENDS in the updateStrips() method
 *           ==> TODO : get it out in another class that extends this one
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
    this.updateStrips();
    document.id(window).addEvent('resize', this.updateStrips.bind(this));

    // Initial positioning
    this.setStripsPropertiesValuesFromPosition(this.scrollSpy.container.getScroll().y);
  },

  setupScrollSpy: function() {
    this.scrollSpy = new ScrollSpy(this.options.scrollSpyOptions);
    this.scrollSpy.setOptions({
      onTick: this.scrollSpyOnTick.bind(this)
    });
  },

  setupStrips: function(configuration) {
    Array.each(configuration, function(item,index){
      this.setupStrip(item);
    }.bind(this));

    return this;
  },

  setupStrip: function(item) {
    var strip = new DcMorphingStrip(item.strip, item.options);
    this.strips.push(strip);

    return this;
  },


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  updateStrips: function() {
    var marginLeftOrigin = -1*(2000-$(window).getSize().x)/2;
    Array.each (this.strips, function(item){
      var marginLeftOriginModifier = 0;
      if (['strip2','strip3','strip9'].contains(item.getId()) && $(window).getSize().y < 750) {
        marginLeftOriginModifier = 300;
      }
      item.morphingStrip.setOptions({
        origins: {
          'margin-left': marginLeftOrigin + marginLeftOriginModifier
        }
      });
      item.morphingStrip.updateMarkers();
    });

    return this;
  },
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


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