'use strict';

describe('Controller: ArticleViewCtrl', function () {

  // load the controller's module
  beforeEach(module('angularApp'));

  var ArticleViewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ArticleViewCtrl = $controller('ArticleViewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ArticleViewCtrl.awesomeThings.length).toBe(3);
  });
});
