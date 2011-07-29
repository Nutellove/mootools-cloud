
$(document).addEvent('domready', function(){


//// DEBUG SCROLL SPY //////////////////////////////////////////////////////////////////////////////////////////////////
  if ($('scrollDebug')) {
    var debugScrollSpy = new ScrollSpy ({
      onTick: function(position, inside, enters, leaves, e){
        $('scrollDebug').set('html',position.y);
        shatteredGlassMorphing.setPropertiesValuesFromPosition(position.y);
      }
    });
  }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//// SMOOTH SCROLLING //////////////////////////////////////////////////////////////////////////////////////////////////

  if ($('scrollDebug')) {
    var winScroll = new Fx.Scroll(window,{
      duration: 10000,
      link: 'cancel'
    });

    $('scrollDebug').addEvent('click', function(){
      winScroll.start(0, 1700);
    });
  }

//  var winScrollStep = 0; var winScrollPos = 0;
//  $(window).addEvent('mousewheel', function(event){
//    if (!winScrollPos) winScrollPos = $(window).getScroll().y;
//    winScrollStep += -1 * 120 * event.wheel;
//    if (winScrollStep < 0 && winScrollPos == 0) winScrollStep = 0;
//    winScroll.start(0, winScrollPos + winScrollStep);
//    event.stop();
//  });
//

//  var winScroller = new Scroller($('body'), {area:200, velocity: 0.1});
//  winScroller.start();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//// JAVASCRIPT POSITIONING ////////////////////////////////////////////////////////////////////////////////////////////

  function positionElements(){
    $('strip2Content').positionFromCenter(-380);
    $('strip3ContentCounter').positionFromCenter(-739);
    $('strip3ContentTop5').positionFromCenter(260);
    $('strip4ContentCounter').positionFromCenter(-252);
    $('strip4ContentTop5').positionFromCenter(433);
    $$('#strip4ContentTop5 div.title').centerVertically();
    $('strip5Content').positionFromCenter(520);
    $('strip6Content').positionFromCenter(-300);
    $('strip7ContentCounter').positionFromCenter(27);
    $('strip7ContentList').positionFromCenter(-527);
  }

  positionElements();
  $(window).addEvent('resize',function(){
    positionElements();
  });


//// FILTERS ///////////////////////////////////////////////////////////////////////////////////////////////////////////


  var favoriteCarsSequentialMorph = new SmoothSequentialMorph ('strip2FilterContent', {
    Transform: ['scale(0.8)','scale(1.0)'],
    opacity: 1
  }, {
    initialCss: {opacity: 0},
    morphDuration: 250,
    concurrentialMorphs: 4,
    excludedCssSelector: '.hidden *',
    onReady: function(){
      $('strip6FilterContent').setStyle('opacity',1);
    }
  });

  var favoriteCarsFilterManager = new FilterManager ('strip2FilterContent', '#strip2Content .filterMenu a', {
    onAfterShow: function(){
      favoriteCarsSequentialMorph.setup().start();
    }
  });



  
  var activitiesChallengesCarsSequentialMorph = new SmoothSequentialMorph ('strip6FilterContent', {
    Transform: ['scale(0.8)','scale(1.0)'],
    opacity: 1
  }, {
    initialCss: {opacity: 0},
    morphDuration: 250,
    concurrentialMorphs: 4,
    excludedCssSelector: '.hidden *',
    onReady: function(){
      $('strip2FilterContent').setStyle('opacity',1);
    }
  });

  var activitiesChallengesFilterManager = new FilterManager ('strip6FilterContent', '#strip6Content .filterMenu a', {
    onAfterShow: function(){
      activitiesChallengesCarsSequentialMorph.setup().start();
    }
  });

//// PAGE LOAD ANIMATIONS //////////////////////////////////////////////////////////////////////////////////////////////

  (function(){

    // STRIP 2
    $('strip2').tween('margin-left',0).get('tween').chain(function(){

      favoriteCarsSequentialMorph.start();

    });

  }.delay(1000));

//// SHATTERED GLASS ANIMATION /////////////////////////////////////////////////////////////////////////////////////////

  var shatteredGlassMorphing = new DcMorphingElement('shatteredGlass', {
    'top': [
      { position: 0,    value: 0    },
      { position: 1700, value: 1100 }
    ]
  });

//// STRIP SCROLL ANIMATIONS ///////////////////////////////////////////////////////////////////////////////////////////

  var strip2Options = {
    stripMorph: {
      'margin-left': [
        { position: 0,   value: -550 },
        { position: 200, value: 0 }
      ]
    }
  };

  var strip3Options = {
    stripMorph: {
      'margin-left': [
        { percent: 0,   value: -700 },
        { percent: 100, value:  500 }
      ]
    }
  };

  var strip5Options = {
    stripMorph: {
      'margin-left': [
        { percent: 0,   value: -1500 },
//        { percent: 40,  value:  -50 },
//        { percent: 60,  value:   50 },
        { percent: 100, value:  1500 }
      ]
    }
//    ,
//    elementsMorph: {
//      '#strip5Content': {
//        opacity: [
//          { percent: 0,   value: 0 },
//          { percent: 25,  value: 0 },
//          { percent: 40,  value: 1 },
//          { percent: 100, value: 1 }
//        ]
//      }
//    }
  };

  var strip7Options = {
    stripMorph: {
      'margin-left': [
        { percent: 0,   value:  1500 },
//        { percent: 40,  value:   50 },
//        { percent: 60,  value:  -50 },
        { percent: 100, value: -1300 }
      ]
    }
  };

  var strip8Options = {
    stripMorph: {
      'margin-left': [
        { percent: 0,   value: -500 },
        { percent: 50,  value:   0  },
        { percent: 100, value:   0  }
      ]
    }
  };

  var strip9Options = {
    stripMorph: {
      'margin-left': [
        { percent: 0,   value:  1500 },
        { percent: 20,  value:   0 }
      ]
    }
  };

  var configuration = [{
    strip: 'strip3',
    options: strip3Options
  },{
    strip: 'strip5',
    options: strip5Options
  },{
    strip: 'strip7',
    options: strip7Options
  },{
    strip: 'strip8',
    options: strip8Options
  },{
    strip: 'strip9',
    options: strip9Options
  }];


  var dcStripManager = new DcMorphingStripManager(configuration);

});