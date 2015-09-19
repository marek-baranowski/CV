'use strict';

describe('Service: personalDetails', function () {

  // load the service's module
  beforeEach(module('cvApp'));

  // instantiate service
  var personalDetails;
  beforeEach(inject(function (_personalDetails_) {
    personalDetails = _personalDetails_;
  }));

  it('should do something', function () {
    expect(!!personalDetails).toBe(true);
  });

});
