module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },

    requirejs: {
      // global config
      options: {
        baseUrl: "/",
        mainConfigFile: "app.js"
      },
      production: {
        // overwrites the default config above
        options: {
          out: "build-production.js"
        }
      },
      dev: {
        // overwrites the default config above
        options: {
          out: "build-dev.js",
          optimize: "none" // no minification
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  // Default task(s).
  grunt.registerTask('default', ['requirejs']);
  grunt.registerTask('uglify', ['uglify']);
};