var fs = require('fs');

module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({

    // bake nunjucks templates to flat HTML
    // ref: https://www.npmjs.com/package/grunt-nunjucks-2-html
    nunjucks: {
      options: {
        data: grunt.file.readJSON('src/data.json'),
        paths: 'src/njk',
        configureEnvironment: function(env, nunjucks) {
          env.addFilter('navigate', function(data_arr, target_index, direction) {
            if (target_index > -1 && target_index < data_arr.length) {
              if (direction === 'prev') {
                return '<p><span class="navigate navigate-back" data-div-id="' + data_arr[target_index].series_name + '">&larr;</span></p>';  
              } else if (direction === 'next') {
                return '<p><span class="navigate navigate-forward" data-div-id="' + data_arr[target_index].series_name + '">Next: ' + data_arr[target_index].hed + ' &rarr;</span></p>';
              } else {
                return '';
              }
            } else {
              return '';
            }
          });
        }
      },
      dev: {
        files: [{
          expand: true,
          cwd: 'src/njk',
          src: [
            '*.html'
          ],
          dest: 'dist',
          ext: '.html'
        }]
      }
    },

    // Transpile LESS
    less: {
      options: {
        sourceMap: true,
      },
      prod: {
        options: {
          compress: true,
          cleancss: false
        },
        files: {
          "dist/style.css": ["src/less/style.less"]
        }
      }
    },

    // Squish all that js into one file
    uglify: {
      options: {
        sourceMap: true
      },
      prod: {
        files: {
          'dist/scripts.js': [
            'node_modules/pym.js/dist/pym.v1.js',
            'src/js/main.js'
          ]
        }
      }
    },

    // watch for changes in js, njk
    watch: {
      markup: {
        files: ['src/njk/**/*.njk', 'src/njk/index.html'],
        tasks: ['nunjucks']
      },
      js: {
        files: ['src/js/**.js'],
        tasks: ['uglify']
      },
      less: {
        files: ['src/less/**.less'],
        tasks: ['less']
      }
    }

  });

  grunt.loadNpmTasks('grunt-nunjucks-2-html');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');

  // default tasks
  var default_tasks = ['uglify', 'less', 'nunjucks', 'watch'];

  grunt.registerTask('default', default_tasks);

};
