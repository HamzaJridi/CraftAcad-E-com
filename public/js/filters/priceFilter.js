angular.module('myApp').filter('byPrice', function () {
  return function (products, slider) {
    return _.filter(products, function (product) {
      return product.price < slider.maxValue && product.price > slider.minValue;
    });
  }
});