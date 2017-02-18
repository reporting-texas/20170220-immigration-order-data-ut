var fs = require('fs');

module.exports = function(grunt) {
  'use strict';

  // path to data file to be consumed by nunjucks templates
  var data_for_nunjucks = grunt.file.readJSON('src/data.json');

  var url_base_path = 'https://reporting-texas.github.io/20170220-immigration-order-data-ut/';

  grunt.initConfig({

    // bake nunjucks templates to flat HTML
    // ref: https://www.npmjs.com/package/grunt-nunjucks-2-html
    nunjucks: {
      options: {
        data: data_for_nunjucks,
        paths: 'src/njk',
        configureEnvironment: function(env, nunjucks) {
          env.addGlobal('url_base', url_base_path);
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
