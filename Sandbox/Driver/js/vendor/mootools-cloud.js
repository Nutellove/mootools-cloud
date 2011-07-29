/**
 * Log wrapper for console.log()
 */
function log () {
  if (Browser.ie && typeof console != 'undefined' && typeof console.log != 'undefined') {
    for (var i=0 ; i < arguments.length ; i++) {
      console.log (arguments[i]);
    }
  }
  if (!Browser.ie && console && typeof console.log == 'function') {
    console.log (arguments.length > 1 ? arguments : arguments[0]);
  }
}



Element.implement({
  /**
   * Positions the Element in its parent Element relative to the centered position
   */
  positionFromCenter: function(positionDelta){
    var c = this.getSize();
    var p = this.getParent().getSize();
    this.setStyle('left', (p.x - c.x)/2 + positionDelta);

    return this;
  }
});


Element.implement ({

  /**
   * Centers vertically this Element in its parent element, or in the provided parent
   *
   * Example of use :
   * $('#theElementToCenterVertically').centerVertically();
   * Yeah, that's it !
   *
   * @author Antoine Goutenoir
   * @param  parent Optional. The parent Element, defaults to the first parent.
   * @return Element This Element
   */
  centerVertically: function(parent){
    parent = $(parent); if (!parent) parent = this.getParent();
    var top = parent.getSize().y / 2 - this.getSize().y / 2;
    if (parent.getStyle('position') == 'static') parent.setStyle('position', 'relative');
    if (this.getStyle('position') == 'static') this.setStyle('position', 'absolute');
    this.setStyle('top', top.toInt());

    return this;
  }

});