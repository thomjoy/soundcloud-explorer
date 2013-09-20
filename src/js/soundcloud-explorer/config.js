requirejs.config({
  baseUrl:      'js/lib',
  waitSeconds:  30,
  urlBust:      '?bust=' + new Date().getTime(),

  paths: {

    // application level stuff
    app: '../soundcloud-explorer',
    m: '../soundcloud-explorer/m',
    v: '../soundcloud-explorer/v',
    c: '../soundcloud-explorer/c',
    t: '../soundcloud-explorer/t',
    constants: '../soundcloud-explorer/constants',
    dateranges: '../soundcloud-explorer/dateranges',
    templates: '../soundcloud-explorer/templates',

    // plugins
    async:                      'requirejs-plugins/src/async',
    font:                       'requirejs-plugins/src/font',
    goog:                       'requirejs-plugins/src/goog',
    image:                      'requirejs-plugins/src/image',
    json:                       'requirejs-plugins/src/json',
    noext:                      'requirejs-plugins/src/noext',
    mdown:                      'requirejs-plugins/src/mdown',
    propertyParser:             'requirejs-plugins/src/propertyParser',
    markdownConverter:          'requirejs-plugins/src/Markdown.Converter',
    text:                       'requirejs-plugins/src/text',
    domReady:                   'requirejs-plugins/src/domReady(callback)',

    underscore:                 'underscore',
    backbone:                   'backbone',
    'backbone.offline':         'backbone_offline',
    jquery:                     'jquery-1.10.2',
    d3:                         'd3/d3',

    soundcloud:                 '//connect.soundcloud.com/sdk',
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
    d3: {
      exports: 'd3'
    },

    // this doesn't work after optimization
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

// load SC
/*define(function(require) {
  var SC = require(['soundcloud']);
});*/

// Define moment and moment-range in one go
require({ paths: {
    'moment': '../lib/moment',
    'moment-range': '../lib/moment-range',
  }
}, ['moment', 'moment-range'], function(m, m1){
});

// start the app
require(['app/main'], function() {
  console.log('Application loaded');
});