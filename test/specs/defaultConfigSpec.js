'use strict';

// load the app module
beforeEach(module('appDefaultConfig'));

describe('angular-pouchdb-logger with default config:', function () {
  'use strict';

  var dbLoggerService,
  // app services
    busService,
    scope;
  // setup
  beforeEach(function () {
    inject(function (_$rootScope_, _dbLoggerService_, _testService_) {
      scope = _$rootScope_;
      dbLoggerService = _dbLoggerService_;
      busService = _testService_;
    });
  });

  afterEach(function (done) {
    // reset database
    dbLoggerService.clearLogData().then(function () {
      done();
    });
    setInterval(scope.$digest, 100);
  });

  it('should log entry', function (done) {
    busService.list('2', '3', function () {
      dbLoggerService.readLogData('INFO').then(function (logEntries) {
        var logInfoEntry = logEntries[0];
        expect(logInfoEntry.details).toBe('2');
        done();
      });
    });
    setInterval(scope.$digest, 100);
  });
});
