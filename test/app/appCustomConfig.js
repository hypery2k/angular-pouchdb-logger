/*global app: true*/
var app = angular.module('appCustomConfig', [
  'ngDbLogger.core'
]);

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


app.factory('testService', function ($log) {
    'use strict';
    return {
      list: function (data, data2, callback) {
        $log.info(data);
        $log.debug(data2);
        callback();
      }
    };
  }
);
