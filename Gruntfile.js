module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // clean everything in build, including subdirs
    clean: {
      build: ['build/*'],
      generated: ['build/generated'],
    },
    
    copy: {
      build: {
        files: [
          //{src: ['src/img'], dest: 'build/'},
          //{src: ['src/style'], dest: 'build/'},
          {expand: true, cwd: 'src/img', src: ['**'], dest: 'build/img'},
          {expand: true, cwd: 'src/style', src: ['**'], dest: 'build/style'}
        ]
      }
    },

    requirejs: {
      // global config
      options: {
        baseUrl:        'src/js',
        //appDir:         'js/soundcloud-explorer',
        mainConfigFile: 'src/js/soundcloud-explorer/config.js',
        name:           'soundcloud-explorer/main', // main.js
      },
      build: {
        // overwrites the default config above
        options: {
          dir: "build",
          optimize: "uglify2"
        }
      },
      dev: {
        // overwrites the default config above
        options: {
          dir: "build",
          optimize: "none" // no minification
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  grunt.registerTask('build', ['clean:build', 'copy:build']);
};