/*
 * grunt-service-worker
 * https://github.com/sparanoid/grunt-service-worker
 *
 * Copyright (c) 2017 Tunghsiao Liu
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

  'use strict';

  var path = require('path');
  var swPrecache = require('sw-precache');

  grunt.registerMultiTask('service_worker', 'sw-precache wrapper', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var done = this.async();
    var options = this.options({
      cacheId: 'grunt-service-worker',
      logger: grunt.log.ok,
      staticFileGlobs: [
        '**/*.{css,html,jpg,gif,png,svg}',
        '**/js/**.js'
      ],
      verbose: false,

      // grunt specific
      baseDir: './',
      workerFile: 'service-worker.js'
    });

    // Map globs for later use
    options.staticFileGlobs.forEach(function(glob, index, staticFileGlobs) {
      options.staticFileGlobs[index] = options.baseDir + '/' + glob;
    });

    // Check `stripPrefix`
    if (!options.stripPrefix) {
      options.stripPrefix = options.baseDir;
    }

    // Resolve worker file
    if (options.workerDir) {
      options.workerPath = path.resolve(options.workerDir, options.workerFile);
    } else {
      options.workerPath = path.resolve(options.baseDir, options.workerFile);
    }

    swPrecache.write(options.workerPath, options, function(error) {
      if (error) {
        grunt.fail.warn(error);
      }
      done();
    });

  });

};
