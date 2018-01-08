# Angular PouchDB Logger 

[![Greenkeeper badge](https://badges.greenkeeper.io/hypery2k/angular-pouchdb-logger.svg)](https://greenkeeper.io/)

[![Build Status](https://travis-ci.org/hypery2k/angular-pouchdb-logger.svg?branch=master)](https://travis-ci.org/hypery2k/angular-pouchdb-logger)
[![Build status](https://ci.appveyor.com/api/projects/status/qbdypq5n7p4x3i78?svg=true)](https://ci.appveyor.com/project/hypery2k/angular-pouchdb-logger)
[![Bower version](https://badge.fury.io/bo/angular-pouchdb-logger.svg)](http://badge.fury.io/bo/angular-pouchdb-logger)
[![npm version](https://badge.fury.io/js/angular-pouchdb-logger.svg)](http://badge.fury.io/js/angular-pouchdb-logger)
[![NPM devDependency Status](https://david-dm.org/hypery2k/angular-pouchdb-logger/dev-status.svg)](https://david-dm.org/hypery2k/angular-pouchdb-logger#info=devDependencies)

> A module for enabling logging to web database via pouchdb and $log delegate. The library is Ionic-aware and autoselect the best db for each platform

[![NPM](https://nodei.co/npm/angular-pouchdb-logger.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/angular-pouchdb-logger/)

> Feel free to **donate**
> 
> <a href='https://pledgie.com/campaigns/31915'><img alt='Click here to lend your support to: NPM packages and make a donation at pledgie.com !' src='https://pledgie.com/campaigns/31915.png?skin_name=chrome' border='0' ></a>
> <a target="_blank" href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=JYG6LVEHB59TL">
> <img alt="" border="0" src="https://www.paypalobjects.com/de_DE/DE/i/btn/btn_donateCC_LG.gif"/>
> </img></a>
> Or donate [Bitcoins](bitcoin:3NKtxw1SRYgess5ev4Ri54GekoAgkR213D):
> [![Bitcoin](https://martinreinhardt-online.de/bitcoin.png)](bitcoin:3NKtxw1SRYgess5ev4Ri54GekoAgkR213D)
> 
> Also via [greenaddress](https://greenaddress.it/pay/GA3ZPfh7As3Gc2oP6pQ1njxMij88u/)

## WIP
- [x] Library core
- [x] Write unit tests
- [x] NPM package
- [ ] Write e2e-tests
- [ ] Write an API doc
- [ ] Provide complete examples

## Usage

Install this module:

```bash
npm install angular-pouchdb-logger --save
```

or via bower

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
