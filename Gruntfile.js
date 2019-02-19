/*
 * grunt-service-worker
 * https://github.com/sparanoid/grunt-service-worker
 *
 * Copyright (c) 2017 Tunghsiao Liu
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    service_worker: {
      default_options: {
        options: {
          baseDir: 'test/fixtures',
          workerDir: 'tmp',
          workerFile: 'default_options.js'
        }
      },
      custom_options: {
        options: {
          baseDir: 'test/fixtures',
          workerDir: 'tmp',
          workerFile: 'custom_options.js',
          staticFileGlobs: [
            '**/*.{gif,jpg,png}'
          ]
        },
      },
      limit_size: {
        options: {
          baseDir: 'test/fixtures',
          workerDir: 'tmp',
          workerFile: 'limit_size.js',
          maximumFileSizeToCacheInBytes: 5
        },
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    },

    conventionalChangelog: {
      options: {
        changelogOpts: {
          preset: "angular"
        }
      },
      dist: {
        src: "CHANGELOG.md"
      }
    },

    bump: {
      options: {
        files: ["package.json"],
        commitMessage: 'chore: release v%VERSION%',
        commitFiles: ["-a"],
        tagMessage: 'chore: create tag %VERSION%',
        push: false
      }
    },

    'npm-contributors': {
      options: {
        commitMessage: 'chore: update contributors'
      }
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'service_worker', 'nodeunit']);

  grunt.registerTask('release', 'bump, changelog and publish to npm.', function(type) {
    grunt.task.run([
      'npm-contributors',
      'bump:' + (type || 'patch') + ':bump-only',
      'conventionalChangelog',
      'bump-commit',
      'npm-publish'
    ]);
  });

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
