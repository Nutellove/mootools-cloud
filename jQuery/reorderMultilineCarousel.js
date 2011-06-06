/**
 * The targeted element has a number of children floating in it, this will reorder them as to appear ordered
 * page per page, each page containing rows x cols elements.
 * NB : we assume its dimensions have already been calculated to fit the passed number of elements in one page
 * @param  cols Number of columns of the new reorganisation
 * @param  rows Number of rows of the new reorganisation
 * @return this
 */
(function( $ ){

  $.fn.reorderMultilineCarouselFloatingElements = function (cols, rows) {

    if (rows < 1 || cols < 1) return this;

    var that = $(this);
    var children = that.children();
    var s = children.size();
    var pages = Math.ceil (s / (rows * cols));
    var nbDummies = ((rows * cols) - (s % (rows * cols))) % (rows * cols);
    var j = 0; var n;

    // Tally s%(rc) dummy elements
    if (nbDummies > 0) {
      var dummy;
      for (var k = 0 ; k < nbDummies ; k++) {
        dummy = children.first().clone();
        dummy.attr('id', dummy.attr('id')+'_dummy'+k);
        dummy.css('visibility','hidden');
        dummy.click(function(e){return false});
        $(this).append (dummy);
      }
      s += nbDummies;
    }

    // Rebuild children (could not .append() directly ?)
    children = that.children();

    var newOrder = [];

    children.each (function(i,e) {
      n = i + ( (Math.floor(i/cols) % rows) * cols * pages ); // magic happens here
      newOrder[n] = e;
    });

    jQuery.each (newOrder, function(i,e) {
      that.append($(e));
    });

    return this;
  };

})( jQuery );