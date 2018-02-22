// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2015-06-18 using
// generator-karma 1.0.0

module.exports = function (config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '.',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      "jasmine"
    ],

    // list of files / patterns to load in the browser
    files: [
      'bower_components/es5-shim/es5-shim.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/pouchdb/dist/pouchdb.js',
      'bower_components/angular-pouchdb/angular-pouchdb.js',
      "src/**/*.js",
      "test/app/**/*.js",
      "test/mocks/**/*.js",
      "test/specs/**/*.js"
    ],

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 9080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      "Chrome"
    ],

    customLaunchers: {
      ChromeHeadless: {
        base: 'Chrome',
        flags: [
          '--no-sandbox',
          '--headless',
          '--disable-gpu',
          '--remote-debugging-port=9222',
        ]
      }
    },


    // Which plugins to enable
    plugins: [
      "karma-chrome-launcher",
      "karma-jasmine-html-reporter",
      "karma-jasmine",
      "karma-junit-reporter"
    ],

    reporters: [
      'progress',
      'junit',
      'kjhtml'
    ],

    junitReporter: {
      outputDir: 'dist/test-report',// results will be saved as $outputDir/$browserName.xml
      suite: 'angular-invocation-handler'
    },

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });

  if (process.env.TRAVIS) {
    config.browsers = ['Chrome_travis_ci'];
  }
};
