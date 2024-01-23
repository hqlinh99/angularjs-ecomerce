myApp.controller("productDetailCtrl", ["$scope", "$timeout", "$routeParams", "productFactory", function ($scope, $timeout, $routeParams, productFactory) {
    $timeout(() => {
        // <script src='layout/menu/cart.controller.js'></script>
    })
    productFactory.getProduct($routeParams.productId).then(res => {
        $scope.product = res.data;
        $scope.imageSelected = res.data.images[0];
    });

    $scope.viewImage = (url) => $scope.imageSelected = url;

}]);
