myApp.controller("productDetailCtrl", ["$scope", "$timeout", "$routeParams", "$location", "productFactory", function ($scope, $timeout, $routeParams, $location, productFactory) {
    $timeout(() => {
        // <script src='layout/menu/cart.controller.js'></script>
    })



    productFactory.getProduct($routeParams.productId).then(res => {
        $scope.product = res.data;
        $scope.imageSelectedIndex = 0;
    });

    $scope.quantity = 1;

    $scope.setImageSelectedIndex = (index) => {
        if (index >= 0 && index < $scope.product.images.length)
            $scope.imageSelectedIndex = index;
    }

    $scope.buyProduct = (cartItem) => {
        $scope.$parent.cart.add(cartItem);

        $location.path("/checkout");
    }
}]);
