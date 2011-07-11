String.implement({

  /**
   * Forces the string representing an integer to have numberOfDigits digits at least, by prepending zeroes
   * @param  numberOfDigits The minimum number of digits you want
   * @return string
   */
  prefixIntegers: function (numberOfDigits) {
    if (this.substr(0,1) == '-') return '-' + this.substr(1).prefixIntegers(numberOfDigits);
    return (Array(numberOfDigits).join('0') + this).slice(-numberOfDigits);
  },

  /**
   * Alias for prefixIntegers
   * @param numberOfDigits
   * @return string
   */
  forceDigits: function (numberOfDigits) {
    return this.prefixIntegers(numberOfDigits);
  }

});