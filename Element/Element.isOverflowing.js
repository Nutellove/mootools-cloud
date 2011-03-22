Element.implement ({

  /**
   * Checks if Element content overflows
   *
   * @author Antoine Goutenoir http://antoine.goutenoir.com
   * @return bool
   */
  isOverflowing: function(){
    var curOverflow = this.style.overflow;
    if ( !curOverflow || curOverflow === "visible" )
       this.style.overflow = "hidden";
    var isOverflowing = this.clientWidth  < this.scrollWidth
                     || this.clientHeight < this.scrollHeight;
    this.style.overflow = curOverflow;

    return isOverflowing;
  },

  /**
   * Alias for isOverflowing()
   */
  isOverflown: function(){return this.isOverflowing(arguments)}

});