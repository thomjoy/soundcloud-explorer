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
          {expand: true, cwd: 'src/img', src: ['**'], dest: 'build/img/'},
          {expand: true, cwd: 'src/style', src: ['**'], dest: 'build/style/'},
          {expand: true, cwd: 'src/js', src: ['**'], build: 'build/js/'}
        ]
      }
    },

    requirejs: {
      compile: {
        options: {
          baseUrl: "src/js/soundcloud-explorer",
          mainConfigFile: "src/js/soundcloud-explorer/config.js",
          out: "build/js/main.js",
          name: "main",
          optimize: 'uglify',
          normalizeDirDefines: 'all',
          logLevel: 2
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  grunt.registerTask('build', ['clean:build', 'copy:build', 'requirejs']);
};