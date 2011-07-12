// Needs class Base64

var WidgetGroup = new Class({
  Implements: [Options, Events],
  options: {
    'hidden': false
  },
  showParams: null,
  elements:   null,

  // CONSTRUCTOR ///////////////////////////////////////////////////////////////
  /**
   * @param elements   Array of Element
   *                   The group of widgets to handle
   * @param showParams Object/Hash
   *                   The params the page must have for the group to be shown
   *                   As values you can use & and | for conditional expressions // TODO
   *                   You can also use a regex instead of a string
   * @param options    Object The usual options, see above
   */
  initialize: function(elements, showParams, options){
    this.setOptions(options);
    this.elements = $$(elements);
    this.showParams   = new Hash (showParams);
    this.elements.set('morph', {duration: 1000});
    this.elements.each(function(element){
      var size = element.getSize();
      if (size.y == 0 && size.x == 0) {
        element.setStyles({
          display:  'block',
          position: 'absolute',
          top:      -10000
        });
        size = element.getSize();
        element.setStyles({
          display:  'none',
          position: 'static',
          top:      0
        });
      }
      element.initialSize = size;
      element.setStyle('overflow-y', 'hidden');
    });
  },
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Refreshes the visibility of the elements of the group
   * based upon the params provided
   * @param Object  params    The parameters of the page
   * @param Boolean instantly False, Optional, do we show/hide instantly ?
   */
  refreshShow: function(params, instantly){
    if (instantly == null) instantly = false;
    if (this.goodParams(params)) {
      this.show (instantly);
    } else {
      this.hide (instantly);
    }
    return this;
  },
  // Check provided params against page params
  // returns true if provided params contains widget params
  goodParams: function(showParams){
    var good = true;
    this.showParams.each(function(paramVal, paramKey){
      if (showParams[paramKey] != paramVal) good = false;
    });
    return good;
  },
  show: function(instantly){
    if (this.isHidden()) {
      this.setHidden (false);
      this.elements.each(function(element){
        element.setStyle('display', 'block');
        if (instantly){
          element.setStyles({
            'height':  element.initialSize.y,
            'opacity': 1
          });
        } else {
          element.setStyle('height', 0);
          element.morph({
            opacity: 1,
            height: element.initialSize.y
          });
        }
      });
    }
    return this;
  },
  hide: function(instantly){
    if (!this.isHidden()) {
      this.setHidden (true);
      this.elements.each(function(element){
        if (instantly){
          element.setStyles({
            'height':  0,
            'opacity': 0
          });
        } else {
          element.morph({
            opacity: 0,
            height: 0
          });
        }
      });
    }
    return this;
  },
  isHidden: function(){
    return this.options.hidden;
  },
  setHidden: function(hidden){
    this.options.hidden = hidden;
    return this;
  }
});

/******************************************************************************/
/******************************************************************************/

var WidgetsManager = new Class({
  Implements: [Options],
  options: {
    defaultParams: {}
  },
  widgetGroups:  [],
  params: {},

  // CONSTRUCTOR ///////////////////////////////////////////////////////////////
  initialize: function(options){
    this.setOptions(options);
    this.uri = new URI();
    this.params = new Hash ($merge(this.options.defaultParams,this.paramsFromURI()));
  },
  //////////////////////////////////////////////////////////////////////////////
  paramsFromURI: function(){
    return this.uri.getData (null, 'fragment');
  },
  paramsToURI: function(){
    this.uri.setData (this.params, false, 'fragment');
    window.location.hash = this.uri.get('fragment');
  },
  addWidgetGroup: function (elements, params, options) {
    elements = $$(elements);
    if (elements) {
      var widgetGroup = new WidgetGroup (elements, params, options);
      widgetGroup.refreshShow (this.params, true);
      this.widgetGroups.push(widgetGroup);
    }
  },
  refresh: function (showParams, instantly) {
    if (!showParams) showParams = {};
    this.params.extend (showParams);
    // Refresh the widgets against the new params
    this.widgetGroups.each (function(widgetGroup){
      widgetGroup.refreshShow (this.params, instantly);
    }.bind(this));
    // Refresh the URL
    this.paramsToURI ();
  }
});
