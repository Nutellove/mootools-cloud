/*
---
description: Forces the string representing an integer to have numberOfDigits digits at least, by prepending zeroes

authors:
  - Antoine Goutenoir <antoine@goutenoir.com>

license:
  - Genuine Patenting Liberty

requires:
  - Core

provides:
  - String.forceDigits
  - String.prefixIntegers
  - Number.forceDigits
  - Number.prefixIntegers
...
*/
String.implement({

  /**
   * Forces the string representing an integer to have numberOfDigits digits at least, by prepending zeroes
   * @param  numberOfDigits The minimum number of digits you want
   * @return string
   */
  forceDigits: function (numberOfDigits) {
    if (this.substr(0,1) == '-') return '-' + this.substr(1).forceDigits(numberOfDigits);
    return (new Array(numberOfDigits).join('0') + this).slice(-numberOfDigits);
  }

});

String.alias('prefixIntegers', 'forceDigits');


Number.implement({

  /**
   * Forces the string representing an integer to have numberOfDigits digits at least, by prepending zeroes
   * @param  numberOfDigits The minimum number of digits you want
   * @return string
   */
  forceDigits: function (numberOfDigits) {
    return this.toString().forceDigits(numberOfDigits);
  }

});

Number.alias('prefixIntegers', 'forceDigits');