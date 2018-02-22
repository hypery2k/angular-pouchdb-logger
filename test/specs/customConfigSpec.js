'use strict';

// load the app module
beforeEach(module('appCustomConfig'));

describe('angular-pouchdb-logger with custom config:', function () {
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
  });

  it('should show debug entry', function (done) {
    busService.list('1', '2', function () {
      dbLoggerService.readLogData('INFO').then(function (logEntries) {
        var logInfoEntry = logEntries[0];
        expect(logInfoEntry.details).toBe('1');
        dbLoggerService.readLogData('DEBUG').then(function (debugEntries) {
          expect(debugEntries.length).toBe(1);
          done();
        });
      });
    });
    setInterval(scope.$digest, 100);
  });
});
