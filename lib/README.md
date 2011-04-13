In this folder reside javascript files not Mootools-dependant, but hell useful anyway.

* `html5-ie.js` allows IE to render/style HTML5 tags
* `debug.js` wraps console.log() (https://github.com/cowboy/javascript-debug)
* `jafx.js` is a loader for flash to be used in the following fashion :

    <script type="text/javascript">
    jafx.ready(function(){jafx.flashs({
      id: 'videos',
      width: '680px',
      swf: '/flash/mise_en_avant.swf',
      version: '9',
      flashvars: {
        id_rubrique: "0",
        id_zone_mea: "13",
        texte:       "Jeux",
        taille_typo: "18",
        couleur:     "FFBF00",
        home:        "0",
        key:         "0b960619520acd3e795cdf2b25cb5fc4",
        id_user: "0"
      },
      params: {
        movie: '/flash/mise_en_avant.swf', // ?
        menu:  'false',
        scale: 'noscale',
        wmode: 'transparent',
        allowfullscreen: 'true'
      }
    })});
    </script>
