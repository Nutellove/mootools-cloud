<?php

class Browser
{

  function __construct ($userAgent='')
  {
    if (empty($userAgent)) {
      $userAgent = $_SERVER['HTTP_USER_AGENT'];
    }
    $browserName = 'Unknown';
    $browserVersion = '';
    $platformName = 'Unknown';
    $platformVersion = '';
    $ub = 'Unknown';
    $version = "";

    $matches = array();

////// PLATFORM DETECTION //////////////////////////////////////////////////////////////////////////////////////////////

    // IPAD
    if (preg_match('/ipad/i', $userAgent)) {
      $platformName = 'iPad';
      if (preg_match('/ipad.*?cpu os ((?:[0-9]+[_.]?)+)/i', $userAgent, $matches)) {
        $platformVersion = str_replace($matches[1], '_', '.');
      }
    }
    // IPHONE
    elseif (preg_match('/iphone/i', $userAgent)) {
      $platformName = 'iPhone';
      if (preg_match('/iphone.*? os ((?:[0-9]+[_.]?)+)/i', $userAgent, $matches)) {
        $platformVersion = str_replace($matches[1], '_', '.');
      }
    }
    // ANDROID
    elseif (preg_match('/android/i', $userAgent)) {
      $platformName = 'Android';
      if (preg_match('/android ((?:[0-9]+\.?)+)/i', $userAgent, $matches)) {
        $platformVersion = $matches[1];
      }
    }
    // LINUX
    elseif (preg_match('/linux/i', $userAgent)) {
      $platformName = 'Linux';
    }
    // MAC
    elseif (preg_match('/macintosh|mac os x/i', $userAgent)) {
      $platformName = 'Mac';
    }
    // WINDOW$
    elseif (preg_match('/windows|win32/i', $userAgent)) {
      $platformName = 'Windows';
    }

////// BROWSER NAME DETECTION //////////////////////////////////////////////////////////////////////////////////////////

    // Next get the name of the useragent yes seperately and for good reason
    if (preg_match('/MSIE/i', $userAgent) && !preg_match('/Opera/i', $userAgent)) {
      $browserName = 'IE';
      $ub = 'MSIE';
    }
    elseif (preg_match('/Firefox/i', $userAgent)) {
      $browserName = 'Firefox';
    }
    elseif (preg_match('/Chrome/i', $userAgent)) {
      $browserName = 'Chrome';
    }
    elseif (preg_match('/Safari/i', $userAgent)) {
      $browserName = 'Safari';
    }
    elseif (preg_match('/Opera/i', $userAgent)) {
      $browserName = 'Opera';
    }
    elseif (preg_match('/Netscape/i', $userAgent)) {
      $browserName = 'Netscape';
    }

    if (empty($ub)) $ub = $browserName;

    // finally get the correct version number
    $known = array('Version', $ub, 'other');
    $pattern = '#(?<browser>' . join('|', $known) . ')[/ ]+(?<version>[0-9.|a-zA-Z.]*)#';
    if (!preg_match_all($pattern, $userAgent, $matches)) {
      // we have no matching number just continue
    }

    // see how many we have
    $i = count($matches['browser']);
    if ($i != 1) {
      //we will have two since we are not using 'other' argument yet
      //see if version is before or after the name
      if (strripos($userAgent, "Version") < strripos($userAgent, $ub)) {
        $version = $matches['version'][0];
      }
      else {
        $version = $matches['version'][1];
      }
    }
    else {
      $version = $matches['version'][0];
    }

    // check if we have a number
    if ($version == null || $version == "") {
      $version = "?";
    }

    $this->userAgent = $userAgent;
    $this->browserName = $browserName;
    $this->browserVersion = $version;
    $this->platformName = $platformName;
    $this->platformVersion = $platformVersion;
    $this->pattern = $pattern;

    return array(
      'userAgent' => $userAgent,
      'name' => $browserName,
      'version' => $version,
      'platform' => $platformName,
      'pattern' => $pattern
    );
  }

//// ACCESSORS /////////////////////////////////////////////////////////////////////////////////////////////////////////

  public function getUserAgent()
  {
    return $this->userAgent;
  }

  public function getBrowserName()
  {
    return $this->browserName;
  }

  public function getBrowserVersion()
  {
    return $this->browserVersion;
  }

  public function getPlatformName()
  {
    return $this->platformName;
  }

  public function getPlatformVersion()
  {
    return $this->platformVersion;
  }

  public function getPattern()
  {
    return $this->pattern;
  }

}
