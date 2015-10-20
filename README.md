# Angular PouchDB Logger 

> A module for enabling logging to web database via pouchdb and $log delegate. The library is Ionic-aware and autoselect the best db for each platform

[![Build Status](https://travis-ci.org/hypery2k/angular-pouchdb-logger.svg?branch=master)](https://travis-ci.org/hypery2k/angular-pouchdb-logger)
[![Build status](https://ci.appveyor.com/api/projects/status/qbdypq5n7p4x3i78?svg=true)](https://ci.appveyor.com/project/hypery2k/angular-pouchdb-logger)
[![Bower version](https://badge.fury.io/bo/angular-pouchdb-logger.svg)](http://badge.fury.io/bo/angular-pouchdb-logger)
[![ NPM devDependency Status](https://david-dm.org/hypery2k/angular-pouchdb-logger/dev-status.svg)](https://david-dm.org/hypery2k/angular-pouchdb-logger#info=devDependencies)

## WIP
- [x] Library core
- [x] Write unit tests
- [ ] Write e2e-tests
- [ ] Write an API doc
- [ ] Provide complete examples

## Usage

Install this module:

```bash
bower install angular-pouchdb-logger --save
```

Add the dependencies

```javascript
/*global app: true*/
var app = angular.module('resourcesApp', [
...
'ngDbLogger.core'
]);
```

If you like to log also debug change the config:

```javascript
app.config(function (ngDbLoggerConfig) {
  'use strict';

  // custom log db name
  ngDbLoggerConfig.dbName = 'customLogDB';
  // enable db logging (default true)
  ngDbLoggerConfig.dbLogging = true;
  // enable debug logging to db
  ngDbLoggerConfig.debug = true;
  // enable trace logging to db
  ngDbLoggerConfig.trace = true;
});

```

The log entries can be read via the `dbLoggerService`

```javascript
app.controller('myController', function (dbLoggerService) {
    'use strict';

    // reset database
    dbLoggerService.clearLogData().then(function () {
      ...
    });
    
    // read log data 
    dbLoggerService.readLogData('INFO').then(function (logEntries) {
      ...
    });
});
```

### About

This module instruments Angular's `delegate` to redirect log entries.
