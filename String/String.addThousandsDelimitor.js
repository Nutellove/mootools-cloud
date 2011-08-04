/*
---
description: Transforms 23456789 into 23 456 789 for example with a space as delimitor

authors:
  - Antoine Goutenoir <antoine@goutenoir.com>

license:
  - copyleft

requires:
  - Core

provides:
  - String.addThousandsDelimitor
...
*/
String.implement({
  addThousandsDelimitor: function(delimitor) {
    if (this.length < 4) return this;
    else return this.substr(0,this.length-3).addThousandsDelimitor(delimitor) + delimitor + this.substr(this.length-3);
  }
});