/**
 * Element that morphes itself according to the page scroll position
 * Example of a mapping (pass an object of them):
      'margin-left': [
        { position: 0,   value: -150 },
        { position: 150, value:   0  },
        { position: 300, value:  500 }
      ]
 * or
      'margin-left': [
        { percent: 0,   value: -150 },
        { percent: 50,  value:   0  },
        { percent: 100, value:  500 }
      ]
 *
 * These map information from scroll position to style value
 * The percent value is calculated as such :
 * - 0% means the element's top  has just entered the visible window area (from the bottom)
 * - 100% means the element's bottom has just disappeared from the visible window area (behind the top)
 *
 * The origins option looks like :
 * {'margin-left': 50}
 * and provides a reference value from which the mapping will relatively differ. Default is 0.
 *
 * @author Antoine Goutenoir <antoine@goutenoir.com>
 */
DcMorphingElement = new Class({

  Implements: Options,

  options: {
    // For when you manipulate top property with percent markers
    defaultTop: 0,
    origins: {},
    debug: false
  },

  initialize: function(element, mappings, options) {
    this.element = document.id(element);
    this.mappings = mappings;
    this.setOptions(options);

    this.updateMarkers();
  },

  log: function() {
    if (this.options.debug && console && console.log) {
      console.log ([this.element.getProperty('id')].append(arguments));
    }

    return this;
  },

  /**
   * Calculates the position value from the percent value (if present) and the window size
   * This method needs to be called back on window.onResize
   */
  updateMarkers: function () {
    var d = this.element.getCoordinates();
    var w = document.id(window).getSize();
    var top = this.element.getStyle('top');
    var topDiff = ((top=='auto') ? 0 : top.toInt()) - this.options.defaultTop;

    Object.each(this.mappings,function(markers, property){
      markers.each(function(marker){
        // Calculate position value from percent value
        if (typeof marker.percent != 'undefined') {
          var p = marker.percent;
          marker.position = d.top + ( (p-100) * w.y + p * d.height ) / 100;
          // Exception for top property
          if (property == 'top') marker.position = marker.position - topDiff;
        }
        // Update absolute value from relative value and origin
        if (this.options.origins.hasOwnProperty(property)) {
          marker.absValue = marker.value + this.options.origins[property];
        } else {
          marker.absValue = marker.value;
        }
      }.bind(this));
    }.bind(this));
    
    this.log("Markers after update", this.mappings);

    return this;
  },

  /**
   * Calculates the value of the property from the markers array and the position
   *
   * Dummy example of this.markers
     'margin-left': [
        { position: 0,   value: -1500 },
        { position: 40,  value:  -50  },
        { position: 60,  value:   50  },
        { position: 150, value:  1500 }
     ]
   * @param property
   * @param position
   */
  getPropertyValueFromPosition: function (property, position) {
    var markers = (this.mappings)[property],
        i = 0,
        // Lower Boundary
        posLB = markers[0].position,
        valLB = markers[0].absValue;

    while (i < markers.length) {
      if (markers[i].position < position) {
        posLB = markers[i].position;
        valLB = markers[i].absValue;
        i++;
      } else if (markers[i].position > position && markers[i].position != posLB) {
        return (markers[i].absValue - valLB) * (position - posLB) / (markers[i].position - posLB) + valLB;
      } else if (markers[i].position > position && markers[i].position == posLB) {
        return valLB;
      } else {
        return markers[i].absValue;
      }
    }

    return valLB;
  },

  setPropertyValueFromPosition: function (property, position) {
    this.element.setStyle(property, this.getPropertyValueFromPosition(property, position));
  },


  /**
   * Bind this method to the ticker of a ScrollSpy for example
   * @param position
   */
  setPropertiesValuesFromPosition: function (position) {
    Object.each(this.mappings, function(item, key){
      this.setPropertyValueFromPosition(key, position);
    }, this);
  }



});