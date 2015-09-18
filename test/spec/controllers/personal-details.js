'use strict';

describe('Controller: PersonalDetailsCtrl', function () {

  // load the controller's module
  beforeEach(module('cvApp'));

  var PersonalDetailsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PersonalDetailsCtrl = $controller('PersonalDetailsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
