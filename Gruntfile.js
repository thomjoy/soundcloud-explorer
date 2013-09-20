module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // clean everything in build, including subdirs
    clean: {
      build: ['build/*'],
      srcjs: ['build/js/lib/**', 'build/js/<%= pkg.name %>/**'],
    },
    
    copy: {
      build: {
        files: [
          {expand: true, cwd: 'src/img', src: ['**'], dest: 'build/img/'},
          {expand: true, cwd: 'src/style', src: ['**'], dest: 'build/style/'},
          {expand: true, cwd: 'src/js', src: ['**'], dest: 'build/js/'},
          {src: 'src/index.html', dest: 'build/index.html'},
          {src: 'src/callback.html', dest: 'build/callback.html'}
        ]
      }
    },

    requirejs: {
      compile: {
        options: {
          baseUrl: "src/js/<%= pkg.name %>",
          mainConfigFile: "src/js/<%= pkg.name %>/config.js",
          out: "build/js/main.js",
          name: "main",
          optimize: 'uglify',
          normalizeDirDefines: 'all',
          logLevel: 2
        }
      }
    },

    htmlref: {

    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  grunt.registerTask('build', ['clean:build', 'copy:build', 'requirejs', 'clean:srcjs']);
};