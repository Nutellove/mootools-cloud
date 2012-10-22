Element.implement ({

  /**
   * Centers vertically this Element in its parent element, or in the provided parent
   *
   * Example of use :
   * $('theElementToCenterVertically').centerVertically();
   *
   * @author Antoine Goutenoir http://antoine.goutenoir.com
   * @param  Element parent Optional. The parent element, defaults to the first parent.
   * @return Element This Element
   */
  centerVertically: function(parent){
    parent = document.id(parent); if (!parent) parent = this.getParent();
    var top = parent.getSize().y / 2 - this.getSize().y / 2;
    if (parent.getStyle('position') == 'static') parent.setStyle('position', 'relative');
    if (this.getStyle('position') == 'static') this.setStyle('position', 'absolute');
    this.setStyle('top', top.toInt());

    return this;
  },

  /**
   * Centers horizontally this Element in its parent element, or in the provided parent
   *
   * @author Antoine Goutenoir antoine@goutenoir.com>
   * @param  Element parent Optional. The parent element, defaults to the first parent.
   * @return Element This Element
   */
  centerHorizontally: function(parent){
    parent = document.id(parent); if (!parent) parent = this.getParent();
    var left = parent.getSize().x / 2 - this.getSize().x / 2;
    if (parent.getStyle('position') == 'static') parent.setStyle('position', 'relative');
    if (this.getStyle('position') == 'static') this.setStyle('position', 'absolute');
    this.setStyle('left', left.toInt());

    return this;
  }

});