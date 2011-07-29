/**
 * Element that morphes itself according to the page scroll position
 * Example of a marker (pass an object of them):
      'margin-left': [
        { position: 0,   value: -150 },
        { position: 200, value:   0  },
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
 * - 0% means the element has just entered the visible window area (from the bottom)
 * - 100% means the element has just disappeared from the visible window area (behind the top)
 *
 *
 */
DcMorphingElement = new Class({

  Implements: Options,

  options: {
    
  },

  initialize: function(element, markers, options) {
    this.element = document.id(element);
    this.markers = markers;
    this.setOptions(options);

    this.updateMarkers();
  },

  /**
   * Calculates the position value from the percent value (if present) and the window size
   * This method needs to be called back on window.onResize
   */
  updateMarkers: function () {
    var d = this.element.getCoordinates();
    var w = document.id(window).getSize();
    Object.each(this.markers,function(markers){
      markers.each(function(marker){
        if (typeof marker.percent != 'undefined') {
          var p = marker.percent;
          marker.position = d.top + ( (p-100) * w.y + p * d.height ) / 100;
        }
      });
    });

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
    var markers = (this.markers)[property],
        i = 0,
        // Lower Boundary
        posLB = markers[0].position,
        valLB = markers[0].value;

    while (i < markers.length) {
      if (markers[i].position < position) {
        posLB = markers[i].position;
        valLB = markers[i].value;
        i++;
      } else if (markers[i].position > position && markers[i].position != posLB) {
        return (markers[i].value - valLB) * (position - posLB) / (markers[i].position - posLB) + valLB;
      } else if (markers[i].position > position && markers[i].position == posLB) {
        return valLB;
      } else {
        return markers[i].value;
      }
    }

    return valLB;
  },

  setPropertyValueFromPosition: function (property, position) {
    this.element.setStyle(property, this.getPropertyValueFromPosition(property, position));
    //this.element.tween(property, this.getPropertyValueFromPosition(property, position)); // slooow
  },


  // @api
  setPropertiesValuesFromPosition: function (position) {
    Object.each(this.markers, function(item, key){
      this.setPropertyValueFromPosition(key, position);
    }, this);
  }



});