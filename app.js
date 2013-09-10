requirejs.config({
  waitSeconds: 30,
  paths: {
      // plugins
      //create alias to plugins (not needed if plugins are on the baseUrl)
      async: 'lib/requirejs-plugins/src/async',
      font: 'lib/requirejs-plugins/src/font',
      goog: 'lib/requirejs-plugins/src/goog',
      image: 'lib/requirejs-plugins/src/image',
      json: 'lib/requirejs-plugins/src/json',
      noext: 'lib/requirejs-plugins/src/noext',
      mdown: 'lib/requirejs-plugins/src/mdown',
      propertyParser : 'lib/requirejs-plugins/src/propertyParser',
      markdownConverter : 'lib/requirejs-plugins/src/Markdown.Converter',
      text: 'lib/requirejs-plugins/src/text',
      domReady: 'lib/requirejs-plugins/src/domReady(callback)',

      underscore:                 'lib/underscore',
      backbone:                   'lib/backbone',
      jquery:                     'lib/jquery-1.10.2',
      moment:                     'lib/moment',
      'moment-range':             'lib/moment-range',
      bootstrap: ['//netdna.bootstrapcdn.com/twitter-bootstrap/3.0.0/js/bootstrap.min', 'libs/bootstrap-min']
  },
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    bootstrap: {
      deps: ['jquery'],
      exports: '$'
    }
  }
});

// SoundCloud API
define('soundcloud',
    ['async!http://connect.soundcloud.com/sdk.js'],
    function(){
        SC.initialize({
          client_id: '9d440de30aed58dd6f5d2ecd754ab5a6',
          redirect_uri: 'http://localhost:9999/index.html'
        });
        SC.connect({
          client_id: '9d440de30aed58dd6f5d2ecd754ab5a6',
          redirect_uri: 'http://localhost:9999/index.html'
        });
        return window.SC;
    });

// load the app.
require(['soundcloud', 'backbone', 'main']);