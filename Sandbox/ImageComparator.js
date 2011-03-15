/**
 * Creates a superposition of 2 images
 *
 *
 * @author  Antoine Goutenoir http://antoine.goutenoir.com
 * @require MooTools 1.3 or later
 */
ImageComparator = new Class({

  Implement: [Options],

  initialize: function(elements, options){
    this.elements = $$(elements);
    this.setOptions(options);
  },

  createComparator: function(imgSrcL, imgSrcR, width, height){
    var frame = new Element('div', {
      styles: {
        width:  width+'px',
        height: height+'px'
      },
      events: {
        mouseover: function(e){
          // Capture mouse position
          //
        }
      }
    });
    var imgL = new Element('div', {
      'class': 'imgL',
      styles: {

      }
    });
  }

});