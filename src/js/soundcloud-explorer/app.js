requirejs.config({
  baseUrl: 'js',
  waitSeconds: 30,
  urlBust: '?bust=' + new Date().getTime(),
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
      'backbone.offline':          'lib/backbone_offline',
      jquery:                     'lib/jquery-1.10.2',
      moment:                     'lib/moment',
      'moment-range':             'lib/moment-range',
      bootstrap: ['//netdna.bootstrapcdn.com/twitter-bootstrap/3.0.0/js/bootstrap.min', 'libs/bootstrap-min'],
      soundcloud: 'http://connect.soundcloud.com/sdk',
      d3: 'lib/d3/d3'
  },
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'backbone.offline': {
      deps: ['underscore', 'backbone'],
      exports: 'Offline'
    },
    bootstrap: {
      deps: ['jquery'],
      exports: '$'
    },
    moment: {
      exports: 'moment'
    },
    'moment-range': {
      deps: ['moment'],
      exports: 'moment'
    },
    d3: {
      exports: 'd3'
    },
    soundcloud: {
      exports: 'SC',
      init: function() {
        SC.initialize({
          client_id: '9d440de30aed58dd6f5d2ecd754ab5a6',
          redirect_uri: 'http://localhost:9999/callback.html'
        });
      }
    }
  }
});

// load the app.
require(['soundcloud', 'backbone', 'backbone.offline', 'main']);