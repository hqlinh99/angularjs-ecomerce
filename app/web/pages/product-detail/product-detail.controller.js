myApp.controller("productDetailCtrl", ["$scope", "$timeout", "$routeParams", function ($scope, $timeout,$routeParams) {
    $timeout(() => {
        // <script src='layout/menu/cart.controller.js'></script>
    })

    console.log($routeParams.productId);
}]);
