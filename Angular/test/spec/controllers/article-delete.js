'use strict';

describe('Controller: ArticleDeleteCtrl', function () {

  // load the controller's module
  beforeEach(module('angularApp'));

  var ArticleDeleteCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ArticleDeleteCtrl = $controller('ArticleDeleteCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ArticleDeleteCtrl.awesomeThings.length).toBe(3);
  });
});
