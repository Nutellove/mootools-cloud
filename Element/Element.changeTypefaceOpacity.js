Element.implement ({

  /**
   * Change Typefaced Element opacity
   *
   * Example usage :
   *
   * $('mytitle').addEvent ('click', function(){
   *   this.changeTypefaceOpacity (0.7);
   * });
   *
   * @author  Antoine Goutenoir http://antoine.goutenoir.com
   * @param string opacity eg: '0.6'
   * @param Object options If defined, smooth transition FX options
   */
  changeTypefaceOpacity: function(opacity, options){
    if (this.getFirst('span') != null) {
      if (options != null) {
        this.getFirst('span').getChildren().set('tween', options);
        this.getFirst('span').getChildren().tween('opacity', opacity);
      }else{
        this.getFirst('span').getChildren().setStyle ('opacity', opacity);
      }
    }

    return this;
  }

});
