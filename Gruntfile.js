module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      
    },
    
    requirejs: {
      // global config
      options: {
        baseUrl:        'src/js',
        //appDir:         'js/soundcloud-explorer',
        mainConfigFile: 'src/js/soundcloud-explorer/config.js',
        name:           'soundcloud-explorer/main', // main.js
      },
      production: {
        // overwrites the default config above
        options: {
          out: "build/build-production.js",
          optimize: "uglify2"
        }
      },
      dev: {
        // overwrites the default config above
        options: {
          out: "src/build-dev.js",
          optimize: "none" // no minification
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  // Default task(s).
  grunt.registerTask('default', ['requirejs']);
};