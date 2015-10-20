var core = angular.module('ngDbLogger.core', []);

// Core

core.constant('ngDbLoggerConfig', {
  dbName: 'logDB',
  dbLogging: true,
  debug: false,
  trace: false
});


core.factory('dbService', function () {
  'use strict';

  var logDB;

  // PUBLIC API
  return function (dbName) {
    if (!logDB) {
      if (typeof ionic != 'undefined') {
        if (ionic.Platform.isAndroid() || ionic.Platform.isWindowsPhone()) {
          logDB = new PouchDB(dbName, {adapter: 'idb', size: 50});
        } else {
          // default use websql
          logDB = new PouchDB(dbName, {adapter: 'websql', size: 50});
        }
      } else {
        // default use websql
        logDB = new PouchDB(dbName, {adapter: 'websql'});
      }
    }
    return logDB;
  };
});

core.factory('dbLoggerService', function ($q, $log, dbService) {
  'use strict';

  var logConfig = $log.getConfig();
  var readLogs = function (pLoglevel) {
    var deferred = $q.defer(),
      db = dbService(logConfig.dbName);
    db.allDocs({
      include_docs: true
    }, function (err, response) {
      if (err) {
        console.error('Error during writing log entries: ' + response);
        deferred.reject(response);
      } else {
        var logs = [];
        for (var id in response.rows) {
          var logEntry = response.rows[id].doc;
          if (pLoglevel) {
            // filter
            if (pLoglevel == logEntry.level) {
              logs.push(logEntry);
            }
          } else {
            // no filter
            logs.push(logEntry);
          }
        }
        if (logs.length === 0) {
          logs = null;
        }
        deferred.resolve(logs);
      }
    });
    return deferred.promise;
  };

  var deleteLogs = function () {
    var deferred = $q.defer();
    var db = dbService(logConfig.dbName);
    db.destroy(function (err, response) {
      if (err) {
        console.error('Error during clearing log database: ' + response);
        deferred.reject(response);
      } else {
        console.info('Sucessfully cleared log database.');
        deferred.resolve(response);
      }
    });
    return deferred.promise;
  };
  // PUBLIC API
  return {
    readLogData: function (pLoglevel) {
      return readLogs(pLoglevel);
    },
    clearLogData: function () {
      return deleteLogs();
    }
  };

});

/**
 * @ngdoc service
 * @name logger
 * @module dbLog
 * @description Provides logging service in browser db.
 */
core.provider('logger', function loggerProvider() {
  'use strict';

  var config = {},
    log;
  config.debug = false;
  config.outputOnly = false;
  config.trace = false;
  config.dbName = 'log';

  /**
   * @ngdoc function
   * @name logService#outputOnly
   *
   * @param {boolean} value to write to console only and not write to database (useful for testing)
   */
  this.outputOnly = function (value) {
    config.outputOnly = !!value;
  };

  /**
   * @ngdoc function
   * @name logService#debugLogging
   *
   * @param {boolean} value to configure if debug entries should be logged
   */
  this.debugLogging = function (value) {
    config.debug = !!value;
  };
  /**
   * @ngdoc function
   * @name logService#traceLogging
   *
   * @param {boolean} value to configure if trace entries should be logged
   */
  this.traceLogging = function (value) {
    config.trace = !!value;
  };
  /**
   * @ngdoc function
   * @name logService#dbName
   *
   * @param {string} name of the database
   */
  this.dbName = function (name) {
    config.dbName = name;
  };
  var writeLogEntry = function (dbService, pLogLevel, pArguments) {
    var message = pArguments[0];
    if (!config.outputOnly) {
      var timestamp = new Date(),
        db = dbService(config.dbName),
        logEntry = {
          timestamp: timestamp,
          level: pLogLevel,
          details: '' + message
        };
      if (db && db.bulkDocs) {
        logEntry._id = '' + timestamp.getTime();
        db.put(logEntry, function (error) {
          if (error) {
            log.error('Error during writing log entry: ' + error);
          }
        });
      }
    }
  };
  this.$get = function Logger($delegate, dbService, ngDbLoggerConfig) {

    config.dbName = ngDbLoggerConfig.dbName;
    config.outputOnly = !ngDbLoggerConfig.dbLogging;
    config.debug = ngDbLoggerConfig.debug;
    if (ngDbLoggerConfig.debug) {
      // enable couchDB debug
      PouchDB.debug.enable('*');
      PouchDB.debug.enable('pouchdb:find');
    } else {
      PouchDB.debug.disable();
      PouchDB.debug.disable('pouchdb:find');
    }
    config.trace = ngDbLoggerConfig.trace;
    log = $delegate;
    return {
      getConfig: function () {
        return config;
      },
      log: function () {
        log.info(arguments);
        writeLogEntry(dbService, 'INFO', arguments);
      },
      warn: function () {
        log.warn(arguments);
        writeLogEntry(dbService, 'WARN', arguments);
      },
      info: function () {
        log.info(arguments);
        writeLogEntry(dbService, 'INFO', arguments);
      },
      error: function () {
        log.error(arguments);
        writeLogEntry(dbService, 'ERROR', arguments);
      },
      debug: function () {
        if (config.debug) {
          log.debug(arguments);
          writeLogEntry(dbService, 'DEBUG', arguments);
        }
      },
      trace: function () {
        if (config.trace) {
          log.trace(arguments);
          writeLogEntry(dbService, 'TRACE', arguments);
        }
      }
    };
  };
});

core.config(function ($provide, loggerProvider, ngDbLoggerConfig) {
  'use strict';

  // logging to pouchDB
  $provide.decorator('$log', ['$delegate', 'dbService', 'ngDbLoggerConfig',
    function ($delegate, dbService, ngDbLoggerConfig) {
      if (typeof loggerProvider.$get === "function") {
        return loggerProvider.$get($delegate, dbService, ngDbLoggerConfig);
      } else {
        return loggerProvider.$get[3]($delegate, dbService, ngDbLoggerConfig);
      }
    }]);
});
