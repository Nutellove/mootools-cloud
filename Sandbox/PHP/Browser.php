<?php

class Browser
{

  function __construct($userAgent)
  {
    if (empty($userAgent)) {
      $userAgent = $_SERVER['HTTP_USER_AGENT'];
    }
    $bname = 'Unknown';
    $platform = 'Unknown';
    $ub = 'Unknown';
    $version = "";

    //First get the platform?
    if (preg_match('/linux/i', $userAgent)) {
      $platform = 'linux';
    }
    elseif (preg_match('/macintosh|mac os x/i', $userAgent)) {
      $platform = 'mac';
    }
    elseif (preg_match('/windows|win32/i', $userAgent)) {
      $platform = 'windows';
    }

    // Next get the name of the useragent yes seperately and for good reason
    if (preg_match('/MSIE/i', $userAgent) && !preg_match('/Opera/i', $userAgent)) {
      $bname = 'Internet Explorer';
      $ub = "MSIE";
    }
    elseif (preg_match('/Firefox/i', $userAgent))
    {
      $bname = 'Mozilla Firefox';
      $ub = "Firefox";
    }
    elseif (preg_match('/Chrome/i', $userAgent))
    {
      $bname = 'Google Chrome';
      $ub = "Chrome";
    }
    elseif (preg_match('/Safari/i', $userAgent))
    {
      $bname = 'Apple Safari';
      $ub = "Safari";
    }
    elseif (preg_match('/Opera/i', $userAgent))
    {
      $bname = 'Opera';
      $ub = "Opera";
    }
    elseif (preg_match('/Netscape/i', $userAgent))
    {
      $bname = 'Netscape';
      $ub = "Netscape";
    }

    // finally get the correct version number
    $known = array('Version', $ub, 'other');
    $pattern = '#(?<browser>' . join('|', $known) .
               ')[/ ]+(?<version>[0-9.|a-zA-Z.]*)#';
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
    $this->browserName = $bname;
    $this->browserVersion = $version;
    $this->platform = $platform;
    $this->pattern = $pattern;

    return array(
      'userAgent' => $userAgent,
      'name' => $bname,
      'version' => $version,
      'platform' => $platform,
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

  public function getPlatform()
  {
    return $this->platform;
  }

  public function getPattern()
  {
    return $this->pattern;
  }

}
