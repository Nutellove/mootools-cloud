/**
 * Creates a superposition of 2 images
 *
 * @author  Antoine Goutenoir http://antoine.goutenoir.com
 * @require MooTools 1.3+
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
          // Capture mouse position relatively to the element
          var pos = this.getPosition();
          var x = e.page.x - pos.x;
          var y = e.page.y - pos.y;
          // TODO
          console.log ("X : "+x);
          console.log ("Y : "+y);
        }
      }
    });
    var imgL = new Element('div', {
      'class': 'imgL',
      styles: {
        'background-position': 'left center',
        'background-repeat':   'no-repeat',
        'background-image':    'url('+imgSrcL+')',
        width:  width+'px',
        height: height+'px'
      }
    });
  }

});