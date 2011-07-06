String.implement({
  /**
   * Forces the string representing an integer to have numberOfDigits digits at least, by prepending zeroes
   * @author Antoine Goutenoir antoine@goutenoir.com
   * @param  numberOfDigits The minimum number of digits you want
   * @return string
   */
  forceDigits: function (numberOfDigits) {
    if (this.substr(0,1) == '-') return '-' + this.substr(1).forceDigits(numberOfDigits);
    if (this.length < numberOfDigits) {
      var i = this.toInt(); var s = this;
      if (i == 0) i = 1;
      while (i / Math.pow(10,numberOfDigits-1) < 1) {
        s = '0' + s;
        i = i * 10;
      }
      return s;
    } else {
      return this;
    }
  }
});