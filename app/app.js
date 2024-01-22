var myApp = angular.module('myApp', ["ngRoute"]);

myApp.config(($routeProvider) => {
    $routeProvider
        .when("/", {
            templateUrl: "pages/home/home.html",
            controller: "homeCtrl"
        })
        .when("/product-detail", {
            templateUrl: "pages/product-detail/product-detail.html",
            controller: "productDetailCtrl"
        })
        .otherwise({
            redirectTo: "/"
        });
});


myApp.controller('myCtrl', ($scope) => {

});