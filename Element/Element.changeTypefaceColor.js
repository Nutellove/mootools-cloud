Element.implement ({

  /**
   * Change Typefaced Element color
   *
   * Example usage :
   *
   * $('mytitle').addEvent ('mouseenter', function(){
   *   this.changeTypefaceColor ('#FF3399');
   * });
   *
   * @author Antoine Goutenoir http://antoine.goutenoir.com
   * @param string color eg: #FF3399
   */
  changeTypefaceColor: function(color){
    if (Browser.Engine.trident) { // IE SHIT
      this.getFirst('span').getChildren().each(function(vectorElement){
        vectorElement.fillColor = color;
      });
    } else { // OTHERS
      this.getFirst('span').getChildren().each(function(vectorElement){
        if (vectorElement.getContext) {
          var ctx = vectorElement.getContext('2d');
          if (ctx.fillStyle.toUpperCase() != color) {
            ctx.fillStyle = color;
            ctx.clearRect(0, 0, 1000, 1000);
            ctx.fill();
          }
        }
      });
    }

    return this;
  }

});
