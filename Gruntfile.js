module.exports = function(grunt) {

    // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    express: {
      dev: {
        options: {
            script: 'server/index.js',
            arg:['--presets es2017,stage-2'],
        }
      }
    },
    watch: {
      scripts: {
        files: ['server/**/*.js'],
        tasks: ['express:dev'],
        options: {
          spawn: false,
        },
      },
      css: {
        files: ['client/style.less', 'client/**/style.less'],
        tasks: ['less:dev'],
        options: {
          spawn: false,
        },
      }
    },
    
    less: {
      dev: {
        files: {
          'client/style.css': ['client/style.less', 'client/**/style.less']
        }
      },
    },

  });

  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');

  // Default task(s).
  grunt.registerTask('default', ['express','less', 'watch']);

};
