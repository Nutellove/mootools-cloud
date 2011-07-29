<?php

/**
 * Detects stuff about the visitor from the UserAgent header string
 *
 * @author Antoine Goutenoir <antoine@goutenoir.com>
 * @version 0.5
 */
class UserAgent
{

  /**
   * Constructor
   * @param string $userAgent Optional. If not set, will use the one from $_SERVER
   */
  function __construct ($userAgent='')
  {
    if (empty($userAgent)) {
      $userAgent = $_SERVER['HTTP_USER_AGENT'];
    }
    $browserName     = 'Unknown';
    $browserVersion  = '';
    $platformName    = 'Unknown';
    $platformVersion = '';
    $ub = 'Unknown';

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
    // WINDOW$ MEDIA PLAYER
    elseif (preg_match('/nsplayer/i', $userAgent)) {
      $platformName = 'Windows';
    }

////// BROWSER NAME DETECTION //////////////////////////////////////////////////////////////////////////////////////////

    // INTERNET FUCKING EXPLORER
    if (preg_match('/MSIE/i', $userAgent) && !preg_match('/Opera/i', $userAgent)) {
      $browserName = 'IE';
      $ub = 'MSIE';
    }
    // SMOKIN' FIREFOX
    elseif (preg_match('/Firefox/i', $userAgent)) {
      $browserName = 'Firefox';
    }
    // SLICK CHROME
    elseif (preg_match('/Chrome/i', $userAgent)) {
      $browserName = 'Chrome';
    }
    // EXP[AE]NSIVE SAFARI
    elseif (preg_match('/Safari/i', $userAgent)) {
      $browserName = 'Safari';
    }
    // GEEKY OPERA
    elseif (preg_match('/Opera/i', $userAgent)) {
      $browserName = 'Opera';
    }
    // DUSTY NETSCAPE
    elseif (preg_match('/Netscape/i', $userAgent)) {
      $browserName = 'Netscape';
    }

    if (empty($ub)) $ub = $browserName;

    // finally get the correct browserVersion number
    $known = array('Version', $ub, 'other');
    $pattern = '#(?<browser>' . join('|', $known) . ')[/ ]+(?<browserVersion>[0-9.|a-zA-Z.]*)#';
    if (!preg_match_all($pattern, $userAgent, $matches)) {
      // we have no matching number just continue
    }

    // see how many we have
    $i = count($matches['browser']);
    if ($i != 1) {
      //we will have two since we are not using 'other' argument yet
      //see if browserVersion is before or after the name
      if (strripos($userAgent, "Version") < strripos($userAgent, $ub)) {
        $browserVersion = $matches['browserVersion'][0];
      }
      else {
        $browserVersion = $matches['browserVersion'][1];
      }
    }
    else {
      $browserVersion = $matches['browserVersion'][0];
    }

    // check if we have a number
    if ($browserVersion == null || $browserVersion == "") {
      $browserVersion = "?";
    }

    $this->userAgent = $userAgent;
    $this->browserName = $browserName;
    $this->browserVersion = $browserVersion;
    $this->platformName = $platformName;
    $this->platformVersion = $platformVersion;
    $this->pattern = $pattern;

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

  /**
   * Returns all the data we extracted from the userAgent string, as an associative array
   * @return array
   */
  public function getData()
  {
    return array (
      'userAgent'       => $this->userAgent,
      'browserName'     => $this->browserName,
      'browserVersion'  => $this->browserVersion,
      'platformName'    => $this->platformName,
      'platformVersion' => $this->platformVersion
    );
  }

}
