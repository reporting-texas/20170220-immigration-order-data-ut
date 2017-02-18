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

    // watch for changes in less/js
    watch: {
      markup: {
        files: ['src/njk/**/*.njk', 'src/njk/index.html'],
        tasks: ['nunjucks']
      }
    }

  });

  grunt.loadNpmTasks('grunt-nunjucks-2-html');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // default tasks
  var default_tasks = ['nunjucks', 'watch'];

  grunt.registerTask('default', default_tasks);

};