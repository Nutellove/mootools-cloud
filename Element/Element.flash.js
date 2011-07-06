Element.implement({

  /**
   * Same as Element.highlight, but for the color of the text
   * 
   * @author Antoine Goutenoir <antoine@goutenoir.com>
   * @param start Color to flash to
   * @param end   Color to get back to, and if not specified defaults to initial color
   */
	flash: function(start, end){
		if (!end){
			end = this.retrieve('flash:original', this.getStyle('color'));
			end = (end == 'transparent') ? '#fff' : end;
		}
		var tween = this.get('tween');
		tween.start('color', start || '#ff3399', end).chain(function(){
			this.setStyle('color', this.retrieve('flash:original'));
			tween.callChain();
		}.bind(this));

		return this;
	}

});