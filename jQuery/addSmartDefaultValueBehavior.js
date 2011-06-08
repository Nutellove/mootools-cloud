/**
 * Prepares an element to behave like a smart input with default value,
 * getting it back on blur if user did not define one after focus
 *
 * Usage :
 *   jQuery('myCssSelectorForOneOrManyElements').addSmartDefaultValueBehavior();
 *
 * @author antoine.goutenoir@gmail.com
 *
 * @return this
 */
(function( $ ){

  $.fn.addSmartDefaultValueBehavior = function () {

    jQuery.each($(this), function(i,el){

      var that = $(el);

      that.data('smartValue', that.attr('value'));

      that.focusin (function(){
        if ($(this).val() == $(this).data('smartValue')) $(this).val('');
      });

      that.focusout (function(){
        if ($(this).val() == '') $(this).val($(this).data('smartValue'));
      });

    });

    return this;
  };

})( jQuery );