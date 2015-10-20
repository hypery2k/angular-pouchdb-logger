/*global app: true*/
var app = angular.module('appDefaultConfig', [
  'ngDbLogger.core'
]);

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
