var myApp = angular.module('myApp', ["ngRoute"]);

myApp.config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "pages/home/home.html",
            controller: "homeCtrl"
        })
        .when("/product-detail/:productId", {
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
    // $locationProvider.html5Mode({
    //     enabled: true,
    //     requireBase: true
    // });

}]);

myApp.controller('myCtrl', ($scope) => {
    $scope.notify = {
        data: [],
        not: {
            type: 'success',
            message: 'Hello',
            position: '-translate-x-[350px]',
            scale: 'scale-[1]'
        },
        create: function (not) {
            this.setScale();

            this.not.type = not.type;
            this.not.message = not.message;


            let notCopy = angular.copy(this.not);
            this.data.push(notCopy);

            this.setPosition(notCopy);
            console.log(this.data);
        },
        setScale: function () {
            let s = 1;
            for (i = this.data.length - 1; i >= 0; i--) {
                s -= 0.02;
                this.data[i].scale = `scale-[${s}]`
            }
        },
        setPosition: function (not) {
            setTimeout(() => {
                not.position = 'translate-x-[0]';
                $scope.$apply();
            }, 1)

            // setTimeout(() => {
            //     not.position = '-translate-x-[350px]';
            //     $scope.$apply();
            // }, 4000)

            // setTimeout(() => {
            //     this.data.shift();
            //     $scope.$apply();
            // }, 5000);
        }
    };
    $scope.cart = [{}];
    $scope.products = [];
    $scope.product = {};
});

//create factory
myApp.factory("productFactory", ["$http", ($http) => {
    const host = "https://api.escuelajs.co/api/v1";
    return {
        getProducts: () => {
            return $http.get(`${host}/products`);
        },
        getProduct: (id) => {
            return $http.get(`${host}/products/` + id);
        }
    }
}]);