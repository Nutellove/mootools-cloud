var AbsoluteUniverse = new Class({

  Implements: [Options, Log, Events, Chain],

  options: {
  
  },

  // CONSTRUCTOR
  initialize: function(elements, options){
    // Usual stuff
    this.elements = $$(elements);
    this.setOptions(options);
    //this.enableLog();
    
    this.prepareUniverse();
    
    return this;
  },
  
  prepareUniverse: function(){
    // Loop on all elements of the page
    
    $$('*').each(function(el){
      if ( !this.elements.contains(el) ) {
        console.log ('Destroy element '+el);
        el.fade('out');
      }
    }.bind(this));

    $$('*').each(function(el){
      if ( this.elements.contains(el) ) {
        console.log ('Prepare element '+el);
        var position = el.getPosition();
        el.setStyle('position', 'absolute');
        el.setStyle('top',  position.y);
        el.setStyle('left', position.x);
        el.setStyle('opacity', 1);
      }
    }.bind(this));
    
    this.callChain();
    return this;
  },
  
  addFx: function(property, to, elements, options){
    this.chain(function(){
      var myFx = new Fx.Tween (this.select(elements), options);
      myFx.start (property, to).chain(function(){
        this.callChain();
      }.bind(this));
    }.bind(this));
    
  },
  
  select: function (elements) {
    return $$(elements);
  },
  
  start: function(){
    this.callChain();
    return this;
  }
  
});



