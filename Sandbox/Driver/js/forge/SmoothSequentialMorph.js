/*
---
description: This class manages a smoothly sequential morphing of children elements of passed element.
             The smoothness spans to options.concurrentialMorphs elements

authors:
  - Antoine Goutenoir <antoine@goutenoir.com>

licence:
  - lulz

requires:
  - Options
  - Chain
  - Events

provides:
  - SmoothSequentialMorph
...
*/
SmoothSequentialMorph = new Class({

  Implements: [Options, Chain, Events],

  options: {
    // Duration of one morph fx
    morphDuration: 500,
    // Number of concurrential morphs at any time (except briefly on start and on complete)
    concurrentialMorphs: 3,
    // Exclude elements responding to this css selector (leave empty to exclude none, a good value is '.hidden *')
    excludedCssSelector: '',
    // Apply these styles to morphed elements before launching chaining
    initialCss: {},
    // No setup on instantiation
    noSetup: false
    
    // onReady: Function.from
    // onStart: Function.from
    // onComplete: Function.from
  },

  initialize: function (parentElement, morphProperties, options) {
    this.parentElement = document.id(parentElement);
    this.morphProperties = morphProperties;
    this.setOptions(options);

    if (!this.options.noSetup) this.setup();
  },

  setup: function() {
    this.chains = this.createChains();
    this.fireEvent('ready');

    return this;
  },

  /**
   * Gets Elements under the parent element that are eligible for sequential morphing :
   * - leaf-most elements (not containers, not brs)
   * - not matching optional excludedCssSelector
   *
   * @return Array
   */
  getMorphingElements: function () {
    var all = this.parentElement.getElements('*:not(br)');
    var leafMost = all.filter(function(item, index){return (item.getFirst('*:not(br)') == null)});
    
    if (this.options.excludedCssSelector != '') {
      var excluded = this.parentElement.getElements(this.options.excludedCssSelector);
      return leafMost.filter(function(item, index){return !excluded.contains(item)});
    } else {
      return leafMost;
    }
  },


  getMorphingElementsReorganisedPerChain: function () {
    var allElements = this.getMorphingElements();
    allElements.setStyles(this.options.initialCss);
    var elements = new Array(this.options.concurrentialMorphs);
    for (var i = 0 ; i < this.options.concurrentialMorphs ; i++) {
      elements[i] = new Array();
    }
    allElements.each(function(item, index){
      elements[index%this.options.concurrentialMorphs].push(item);
    }, this);

    return elements;
  },

  /**
   * Creates the concurrential chains, as many as options.concurrentialMorphs
   * Each chain function is the morphing of an element
   */
  createChains: function () {
    var elements = this.getMorphingElementsReorganisedPerChain();
    var chains = new Array(this.options.concurrentialMorphs.toInt());
    var self = this;

    for (var i = 0 ; i < elements.length ; i++) {
      chains[i] = new Chain;
      for (var j = 0 ; j < elements[i].length ; j++) {

        chains[i].chain(function(){
          
          var i = arguments[0],
              j = arguments[1];

          elements[i][j].set('morph',{
            duration: self.options.morphDuration,
            onComplete: function(){
              this.callChain();
            }.bind(this)
          });

          elements[i][j].morph(self.morphProperties);

        }.bind(chains[i],i,j)); // moo goodness :]
        
      }
    }

    // Add a callChain to the end of the last chain stack called, so that we can chain this class like a FX
    chains[elements.length%chains.length].chain(function(){
      this.fireEvent('complete');
      this.callChain();
    }.bind(this));

    return chains;
  },

  /**
   * Starts the FX, and fire all the chains with a perfect delay between them
   */
  start: function () {
    this.fireEvent('start');
    for (var i = 0 ; i < this.chains.length ; i++) {
      this.chains[i].callChain.delay(i * this.options.morphDuration / this.chains.length, this.chains[i]);
    }

    return this;
  }

});