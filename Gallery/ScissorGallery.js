/**
 * Creates a dual-way scissor gallery effect, one frame goes up and the other down
 * You must structure your HTML in (for example) such a fashion :
 *
    <div id="contentFrame">
      <div id="leftContentFrame">                                                   -- fixed dimensions, overflow hidden
        <div id="leftContent">                                                            -- big div scrolling in parent
          <div>                                                                                    -- each div is a page
            <h2>Un gaulois sans âme</h2>
          </div>
          <div>
            <p>Un parfum inspiré d'une collection inspirée elle-même par le désert.</p>
          </div>
          <div>
            <p>1000 flacons numérotés pour 1000 femmes uniques. 1000 femmes bleues conquises...</p>
          </div>
        </div>
      </div>
      <div id="rightContentFrame">                                                  -- fixed dimensions, overflow hidden
        <div id="rightContent">                                                           -- big div scrolling in parent
          <div>                                                                                    -- each div is a page
            <img src="assets/img/flacon.jpg" alt="Flacon" />
          </div>
          <div>
            <p>Comme la bande originale olfactive, une vision textile retraduite en émotions parfumées</p>
          </div>
          <div>
            <p>C'est La Femme Bionique !</p>
          </div>
        </div>
      </div>
      <div id="navigation"></div>                              -- if you want a navigation, create an empty div anywhere
    </div>
 *
 * @param normalFrame   An Element or its ID, this is the frame with overflow hidden ('leftContentFrame' in the above example)
 * @param reversedFrame An Element or its ID, this is the frame with overflow hidden ('rightContentFrame' in the above example)
 * @param navigation    Optional. Set to null to desactivate. The Element or ID of the navigation container
 * @param options       Usual Options Object, see below for details
 *
 * @option autoReverse [true] Will automatically reverse the order of the elements in the reversedFrame
 * @option pageSelector ['div'] CSS Selector used to identify pages within a frame content
 * @option navSelector ['li'] CSS Selector identifying the navigation links within the navigation element
 * @option buildNavigation [true] Should we dynamically build a ul navigation inside the passed $(navigation) element ?
 * @option spanInNavigation [false] If true, injects a span in the navigation li, useful sometimes for complex styling
 * @option scrollOptions Fx Options to pass to Fx.Scroll  (duration, transition, link, and such)
 *
 * @licence GNU/GPL
 * @require MooTools 1.3+
 * @version 0.2
 * 
 * @provide ScissorGallery
 * @depends Element.reverseChildren (defined below)
 * 
 * @source https://github.com/Nutellove/mootools-cloud
 * @author antoine.goutenoir@gmail.com
 *
 * @todo Propose mouse scroll and keyboard Events management, maybe in new class ?
 */
var ScissorGallery = new Class({

  Implements: [Options, Events],

  options: {
    autoReverse:  true,           // Set this to false if you have problems like element mismatching between the two frames
    pageSelector: 'div',          // a CSS Selector identifying pages within a frame element
    navSelector:  'li',           // a CSS Selector identifying the navigation links within the navigation element
    buildNavigation: true,        // Uses the navigation parameter to build the <ul> navigation
    spanInNavigation: false,      // Injects a span in the navigation li, useful sometimes for complex styling
    scrollOptions: {}             // Fx Options to pass to Fx.Scroll
  },

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // CONSTRUCTOR
  initialize: function (normalFrame, reversedFrame, navigation, options){
    this.setOptions(options);
    this.normalFrame   = $(normalFrame);
    this.reversedFrame = $(reversedFrame);
    if (navigation) this.navigation = $(navigation);
    else            this.navigation = null;

    this.currentPage = 0;

    if (this.options.autoReverse) {
      this.reversedFrame.getElement('div').reverseChildren();
    }

    var scrollOptions = Object.merge({
      wheelStops: false,
      duration: 1000,
      link: 'cancel'
    }, this.options.scrollOptions);
    this.normalFrameScroll   = new Fx.Scroll (this.normalFrame, scrollOptions);
    this.reversedFrameScroll = new Fx.Scroll (this.reversedFrame, scrollOptions);

    this.normalFrameScroll.set   (0, this.currentPage * this.getPageHeight());
    this.reversedFrameScroll.set (0, (this.getNumberOfPages() - 1 - this.currentPage) * this.getPageHeight());

    if (this.navigation) {
      if (this.options.buildNavigation) {
        this.buildNavigation();
      }
      this.setNavigation();
    }
  },

  log: function () {
    if (typeof console != 'undefined' && console.log != null) {
      return console.log (arguments);
    }
  },

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Returns the unitary height we should scroll when we switch from one page to the next
   * @return int
   */
  getPageHeight: function () {
    return this.normalFrame.getSize().y;
  },

  /**
   * Returns the number of pages
   * @return int
   */
  getNumberOfPages: function () {
    return this.normalFrame.getElement('div').getElements(this.options.pageSelector).length;
  },

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Builds the DOM of the navigation list and injects it inside the $(navigation) element
   */
  buildNavigation: function() {
    var that = this;
    var ul = new Element ('ul'); var li; var span;
    for (var i = 0 ; i < this.getNumberOfPages() ; i++) {
      li = new Element ('li', {
        html: i+'/'+this.getNumberOfPages()
      });
      if (this.options.spanInNavigation) {
        li.set('html', '');
        span = new Element ('span', {
          html: (i+1)+'/'+this.getNumberOfPages()
        });
        span.inject (li);
      }

      if (i == this.currentPage) li.addClass('active');
      li.inject (ul);
    }
    ul.inject (this.navigation);

    return this;
  },

  setNavigation: function () {
    var that = this;
    this.navigation.getElements(this.options.navSelector).each (function(el, i, els){
      el.addEvent ('click', function(e){
        that.goToPage(i);

        return false;
      });
    });

    return this;
  },

  /**
   * Updates the CSS of the navigation according to the currentPage
   */
  updateNavigation: function () {
    if (this.navigation) {
      var navs = this.navigation.getElements(this.options.navSelector);
      navs.removeClass ('active');
      navs[this.currentPage].addClass('active');
    }

    return this;
  },

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Activates the page "scissor" animation, going to page with the specified index
   * @param index
   */
  goToPage: function (index) {
    if (index >= 0 && index < this.getNumberOfPages()) {
      this.currentPage = index;
      this.normalFrameScroll.start   (0, this.currentPage * this.getPageHeight());
      this.reversedFrameScroll.start (0, (this.getNumberOfPages() - 1 - this.currentPage) * this.getPageHeight());
      this.updateNavigation();
    }

    return this;
  },

  goToPreviousPage: function () {
    return this.goToPage (this.currentPage - 1);
  },
  goToNextPage: function () {
    return this.goToPage (this.currentPage + 1);
  },
  goToFirstPage: function () {
    return this.goToPage (0);
  },
  goToLastPage: function () {
    return this.goToPage (this.getNumberOfPages()-1);
  }

});

//// ELEMENT IMPLEMENT /////////////////////////////////////////////////////////////////////////////////////////////////

Element.implement({

  /**
   * Reverses the order of the children
   * @provide Element.reverseChildren
   */
  reverseChildren: function () {
    var children = this.getChildren();
    this.empty();
    children.reverse().inject(this);

    return this;
  }

});