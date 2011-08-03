/*
---
description: Makes sure this function will only be used at most naxUsages times. A disposable function, like a bic!

authors:
  - Antoine Goutenoir <antoine@goutenoir.com>

license:
  - MIT-style license

requires:
  - Core

provides:
  - Function.maxUsages
  - Function.bic
...
*/
Function.implement({
  maxUsages: function(maxUsages) {
    var nbUsages = 1;
    return function(){
      if (nbUsages++ <= maxUsages) return this.apply(this, arguments);
    }.bind(this);
  }
});

Function.alias('bic', 'maxUsages');