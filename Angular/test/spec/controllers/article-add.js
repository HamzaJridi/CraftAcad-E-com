'use strict';

describe('Controller: ArticleAddCtrl', function () {

  // load the controller's module
  beforeEach(module('angularApp'));

  var ArticleAddCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ArticleAddCtrl = $controller('ArticleAddCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ArticleAddCtrl.awesomeThings.length).toBe(3);
  });
});
