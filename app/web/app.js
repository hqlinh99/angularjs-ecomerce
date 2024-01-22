var myApp = angular.module('myApp', ["ngRoute"]);

myApp.config(["$routeProvider", "$locationProvider",function ($routeProvider, $locationProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "pages/home/home.html",
            controller: "homeCtrl"
        })
        .when("/product-detail", {
            templateUrl: "pages/product-detail/product-detail.html",
            controller: "productDetailCtrl"
        })
        .when("/checkout", {
            templateUrl: "pages/checkout/checkout.html",
            controller: "checkoutCtrl"
        })
        .otherwise({
            redirectTo: "/"
        });
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

}]);

myApp.controller('myCtrl', ($scope) => {
    $scope.cart = [];
    $scope.products = [];
    $scope.product = {};
});