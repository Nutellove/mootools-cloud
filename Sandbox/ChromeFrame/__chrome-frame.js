
window.google||(google={});if(!window.google.update)google.update={};google.update.c=[];function _GU_OnloadHandlerAdd(b,a){var d=google.update.c.length;typeof a=="number"&&a<d&&a>=0&&(d=a);google.update.c.splice(d,0,b)}function _GU_OnloadBody(b){var a=window.google.update.c;if(a)for(var d=0;d<a.length;++d)try{a[d](b)}catch(c){}}
function _GU_getPlatform(){if(window.google.update.d)return window.google.update.d;window.google.update.d=navigator.platform=="Win32"?"win":navigator.platform=="WinCE"?"wince":/linux/i.test(navigator.platform)?"linux":/mac/i.test(navigator.platform)?"mac":"win";return window.google.update.d}
function _GU_getBrowserId(){if(window.google.update.a)return window.google.update.a;window.google.update.a=0;if(navigator.userAgent.indexOf("Opera")!=-1)window.google.update.a=0;else if(navigator.userAgent.indexOf("Firefox")!=-1)window.google.update.a=3;else if(navigator.userAgent.indexOf("MSIE")!=-1)if(navigator.userAgent.indexOf("Windows CE")!=-1)window.google.update.a=0;else{if(navigator.userAgent.indexOf("PPC")==-1&&navigator.userAgent.indexOf("Smartphone")==-1)window.google.update.a=2}else if(navigator.userAgent.indexOf("Chrome")!=
-1)window.google.update.a=4;else if(navigator.userAgent.indexOf("Safari")!=-1)window.google.update.a=0;return window.google.update.a}function _GU_setCookie(b,a,d){b=b+"="+escape(a);-1!=d&&(a=new Date,a.setMinutes(a.getMinutes()+d),b+=";expires="+a.toUTCString());document.cookie=b}function _GU_setSessionCookie(b,a){_GU_setCookie(b,a,-1)}
function _GU_getCookie(b){if(document.cookie){var a=document.cookie.indexOf(b+"=");if(a!=-1&&(a==0||document.cookie.substring(a-2,a-1)==";")){a=a+b.length+1;b=document.cookie.indexOf(";",a);if(b==-1)b=document.cookie.length;return unescape(document.cookie.substring(a,b))}}return""}function _GU_removeCookie(b){_GU_setCookie(b,"",0)}function _GU_areCookiesSupported(){_GU_setCookie("test","1",1);var b=_GU_getCookie("test")=="1";_GU_removeCookie("test");return b}
function _GU_initIid(){function b(){function a(){for(var b=65536,b=Math.floor(Math.random()*b),b=b.toString(16);b.length<4;)b="0"+b;return b.toUpperCase()}return"{"+a()+a()+"-"+a()+"-"+a()+"-"+a()+"-"+a()+a()+a()+"}"}var a=_GU_getCookie("iid");a?window.google.update.b=a:_GU_areCookiesSupported()?(window.google.update.b=b(),_GU_setSessionCookie("iid",window.google.update.b)):window.google.update.b="{11112222-3333-4444-5555-666677778888}"}
function _GU_getIid(){window.google.update.b||_GU_initIid();return window.google.update.b}function _GU_createAppInfo(b,a,d,c){var e={};e.guid=b;e.name=a;e.needsAdmin=d;e.customParams=c;return e}
function GU_BuildTag(b,a){a||(a="");for(var d="",c=0;c<b.length;++c)c==0?(d+="appguid="+b[c].guid,d+=a):d+="&appguid="+b[c].guid,d+="&appname="+encodeURIComponent(b[c].name).replace(/~/g,"%7E").replace(/\!/g,"%21").replace(/\*/g,"%2A").replace(/\(/g,"%28").replace(/\)/g,"%29").replace(/\'/g,"%27"),d+="&needsadmin="+b[c].needsAdmin,b[c].customParams&&(d+=b[c].customParams);return d}
function GU_buildGlobalExtra(b,a){var d="&iid="+_GU_getIid()+"&lang="+b+"&browser="+_GU_getBrowserId()+"&usagestats=";d+=a?"1":"0";return d}
function _GU_isClickOnceAvailable(){function b(a){function b(a,d){var c=0,e=0,f=0;do e=c<a.length?Number(a[c]):0,f=c<d.length?Number(d[c]):0,++c;while((c<a.length||c<d.length)&&e==f);if(e<f)return-1;if(e>f)return 1;return 0}var c=navigator.userAgent.match(/\.NET CLR [0-9.]+/g);if(c==null||c.length==0)return!1;a=a.split(".");if(a.length==0)return!1;for(var e=0;e<c.length;++e){var f=c[e].match(/\.NET CLR ([0-9.]+)/);if(!(f==null||f.length!=2))if(f=f[1].split("."),f.length>0&&b(a,f)<=0)return!0}return!1}
if(window.location.search.indexOf("noclickonce")>=0)return!1;if(2!=_GU_getBrowserId())return!1;return b("2.0.0")}function _GU_isOneClickAvailable(){return window.google.update&&window.google.update.oneclick}function _GU_SetupOneClick(){_GU_SetupOneClickVersions(["9","8"])}
function _GU_SetupOneClickVersions(b){function a(a){var b=document.createElement("object");b.type="application/x-vnd.google.oneclickctrl."+a;b.id="OneClickCtrl";document.body.appendChild(b);return b}if((!window.google.update||!window.google.update.oneclick)&&"win"==_GU_getPlatform()){for(var d=0;d<b.length;++d){var c=b[d];try{new ActiveXObject("Google.OneClickCtrl."+c),window.google.update.oneclickPlugin_=a(c)}catch(e){var f=navigator.mimeTypes["application/x-vnd.google.oneclickctrl."+c];if(f&&f.enabledPlugin)window.google.update.oneclickPlugin_=
a(c)}if(window.google.update.oneclickPlugin_)break}if(window.google.update.oneclickPlugin_&&!(window.location.search.indexOf("nooneclick")>=0)&&!window.google.update.oneclick)window.google.update.oneclick={getOneClickVersion:function(){try{return window.google.update.oneclickPlugin_.GetOneClickVersion()}catch(a){return-1}},install:function(a,b,c,e,f){var i="//tools.google.com";i+="/service/update2/installping";c=GU_buildGlobalExtra(b,c);c='"'+GU_BuildTag(a,c)+'"';for(d=0;d<a.length;++d){var g=i;g+=
"?appid="+encodeURIComponent(a[d].guid);g+="&lang="+encodeURIComponent(b);g+="&iid="+encodeURIComponent(_GU_getIid());g+="&installsource=oneclick";var j=new Image;j.src=g}a="/install "+c;try{window.google.update.oneclickPlugin_.Install(a,e,f)}catch(h){e=0;try{e=h.number,e||(a="",a=h.message?h.message:h,e=parseInt(a,"0x"==a.substring(0,2)?16:10))}catch(k){}if(isNaN(e)||0==e)e=-2;f(e)}},launchAppCommand:function(a,b,c){if(window.google.update.oneclick.getOneClickVersion()<9)return!1;try{return window.google.update.oneclickPlugin_.LaunchAppCommand(a,
b,c),!0}catch(d){return!1}},getInstalledVersion:function(a,b){var c="";try{c=window.google.update.oneclickPlugin_.GetInstalledVersion(a,b)}catch(d){}return c}}}}function _GU_buildDlPath(b,a,d,c,e){a=GU_buildGlobalExtra(a,d);b=GU_BuildTag(b,a);return c+"/tag/s/"+encodeURIComponent(b)+e}function _GU_buildDlPathNoTag(b,a,d,c,e){return c+e}function _GU_buildClickOncePath(b,a,d,c,e){a=GU_buildGlobalExtra(a,d);b=GU_BuildTag(b,a);return c+e+"?"+encodeURIComponent(b)};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function runTagParamsHook(tag, opt_guid) {return tag;}

 function runThankYouQueryHook(query) {return query;}

 function runGetAppsPageHook(apps) {return apps;}


 var referer = "http://code.google.com/chrome/chromeframe/";
 function resetButtons(name) {
   var buttons = document.getElementsByName(name);
   for (i = 0; i < buttons.length; ++i) {
     buttons[i].disabled = false;
   }
 }
 function showThrobber(isVisible) {
   var divThrobber = document.getElementById('throbber');
   var imgThrobber = document.getElementById('throbber-img');
   if (!divThrobber || !imgThrobber) {
     return;
   }
   if (!isVisible) {
     divThrobber.style.display = 'none';
   }

   imgThrobber.src = isVisible ?

       "/tools/dlpage/res/chrome/images/chrome_throbber_fast_16.gif"

       : "";
   if (isVisible) {
     divThrobber.style.display = 'inline';
   }
 }

 function getThankyouUrl(extraQuery) {
   var thankYouPath = "thankyou.html";
   if (areStatsEnabled()) {
     extraQuery += '&statcb=';
   }
   var query = "" + extraQuery;
   if (query.length > 0 && query.charAt(0) != '?') {
     query = '?' + query;
   }
   query = runThankYouQueryHook(query);
   return thankYouPath + query;
 }
 function queueThankyou(timeout, queryString, opt_navDocument) {
   var page = getThankyouUrl(queryString);
   var doc = opt_navDocument || this.document;
   setTimeout(function() {showThrobber(false);
                          resetButtons("submitbutton");
                          doc.location.href = page}, timeout);}

function getApps() {
  var apps = new Array();

  apps.push(_GU_createAppInfo(
    "{8BA986DA-5100-405E-AA35-86F34A02ACBF}",
    "Google Chrome Frame  ",
    "true",
    runTagParamsHook(
      "",
      "{8BA986DA-5100-405E-AA35-86F34A02ACBF}")
  ));

  return runGetAppsPageHook(apps);
}

 function areStatsEnabled() {
   var statcb = document.getElementById("statcb");
   return (statcb && statcb.checked);
 }
 function isDownloadTaggingEnabled() {

   return true;
 }

function getDownloadPath() {
  return "/update2/installers/ChromeFrameSetup.exe";
}

 function downloadInstaller(statEnable, opt_buildDownloadPath, opt_filePath) {
   var defaultDownloadPath = isDownloadTaggingEnabled() ?
       _GU_buildDlPath : _GU_buildDlPathNoTag;
   var buildDownloadPath = opt_buildDownloadPath || defaultDownloadPath;
   var filePath = opt_filePath || getDownloadPath();


     var dlServer =

       "https://dl-ssl.google.com";

   location.href =
       buildDownloadPath(getApps(),
                         "en",
                         statEnable,
                         dlServer,
                         filePath);

 }
 function installViaDownload(opt_navDocument) {
   queueThankyou(4000, '', opt_navDocument);
   downloadInstaller(areStatsEnabled());

   showThrobber(true);
 }
 function isClickOnceEnabled() {

   return true;
 }
 function isOneClickEnabled() {
   return true;
 }
 function installViaClickOnce(opt_navDocument) {

   queueThankyou(10000, '\x26clickonceinstalled=', opt_navDocument);

   downloadInstaller(areStatsEnabled(), _GU_buildClickOncePath, "/update2/installers/clickonce/GoogleInstaller_en.application");

   showThrobber(true);
 }
 function installViaOneClick(opt_navDocument) {
   showThrobber(true);
   window.google.update.oneclick.install(
     getApps(),
     "en",
     areStatsEnabled(),
     function() {queueThankyou(4000, '\x26oneclickinstalled=', opt_navDocument);},
     function(hr) {installViaDownload(opt_navDocument);});
 }
 function getInstallSource() {

     if (isOneClickEnabled() && _GU_isOneClickAvailable()) {
       return 'oneclick';
     } else if (isClickOnceEnabled() && _GU_isClickOnceAvailable()) {
       return 'clickonce';
     } else {
       return 'download';
     }

 }
 function installApp(opt_navDocument) {
   sendDlPagePing("install", getInstallSource());


   var method = getInstallSource();
   if (method === 'oneclick') {
     installViaOneClick(opt_navDocument);
   } else if (method === 'clickonce') {
     installViaClickOnce(opt_navDocument);
   } else {
     installViaDownload(opt_navDocument);
   }
 }

 function sendDlPagePing(stage, installSource) {
   var img = new Image();
   var extra = GU_buildGlobalExtra(
         "en", areStatsEnabled());
   var tag = GU_BuildTag(getApps(), extra);
   img.src = '//tools.google.com/service/update2/dlpageping?' +
       tag +
       '&stage=' + stage +
       '&installsource=' + installSource;
 }


 _GU_OnloadHandlerAdd(
   function() {
     if (isOneClickEnabled()) {
     _GU_SetupOneClick();
     }
   }, 0); // front of list

 _GU_OnloadHandlerAdd(
   function(pagename) {
     sendDlPagePing(pagename, getInstallSource());
   });  // added to end of body.onload handler list

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

window.addEvent('domready', function(){

  // Create the installation prompt frame
  var CFInstallFrame = new Element ('div', {
    id: 'CFInstallFrame',
    styles: {
      position: 'absolute',
      top:    '5px',
      right:  '5px',
      width:  '200px',
      height: '100px'
    }
  });

  // Create the installation prompt link
  var CFInstallLink = new Element ('a', {
    id: 'CFInstallLink',
    html: 'INSTALL',
    styles: {
      display: 'block',
      margin:  '30px auto 30px auto',
      width:   '100px',
      height:  '40px'
    }
  });

  CFInstallLink.addEvent('click', function(e){
    e.stop();
    alert ('Install 1');
    installCF();
    alert ('Install 2');

    return false;
  });

  CFInstallLink.inject (CFInstallFrame);
  CFInstallFrame.inject (document);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  var installCF = function () {
    window.google.update.oneclick.install(
      getApps(),
      "en",
      areStatsEnabled(),
      function() {
        alert ('queueThankYou');
        //queueThankyou(4000, '\x26oneclickinstalled=', opt_navDocument);
      },
      function(hr) {
        alert ('installViaDownload');
        installViaDownload(opt_navDocument);
      }
    );
  };


});


CFInstall.check({
  mode: "overlay"
});