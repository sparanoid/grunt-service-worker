# grunt-service-worker

[![NPM version](https://img.shields.io/npm/v/grunt-service-worker.svg?)](https://www.npmjs.com/package/grunt-service-worker)
[![Build Status](https://travis-ci.org/sparanoid/grunt-service-worker.svg?branch=master)](https://travis-ci.org/sparanoid/grunt-service-worker)
[![dependencies Status](https://img.shields.io/david/sparanoid/grunt-service-worker.svg)](https://david-dm.org/sparanoid/grunt-service-worker)
[![devDependencies Status](https://img.shields.io/david/dev/sparanoid/grunt-service-worker.svg)](https://david-dm.org/sparanoid/grunt-service-worker?type=dev)

> `sw-precache` wrapper

## Getting Started

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-service-worker --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-service-worker');
```

## The "service_worker" task

### Overview

In your project's Gruntfile, add a section named `service_worker` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  service_worker: {
    options: {
      // Task-specific options go here.
    }
  },
});
```

### Options

Options are passed to [sw-precache](https://github.com/GoogleChrome/sw-precache). In addition this task defines some extra options:

#### options.baseDir

Type: `String`  
Default value: `'./'`

The base working directory `swPrecache` scans.

#### options.workerFile

Type: `String`  
Default value: `'service-worker.js'`

Service Worker entry filename, `sw.js` would be a good alternative.

### Usage Examples

#### Default Options

In this example, `service_worker` will scans all files under `public` directory and generate `service-worker.js` with default options.

```js
grunt.initConfig({
  service_worker: {
    options: {
      baseDir: 'public'
    }
  },
});
```

#### Custom Options

In this example, `service_worker` will scans all files under `dist` directory and generate `sw.js` with a custom `staticFileGlobs`.

```js
grunt.initConfig({
  service_worker: {
    options: {
      baseDir: 'dist',
      workerFile: 'sw.js'
      staticFileGlobs: [
        '**/*.{gif,jpg,png}'
      ]
    }
  },
});
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## License

MIT
