window.productDetailCtrl = function($scope, $routeParams, $location, productFactory) {
    $scope.$parent.pageTitle = "Product Detail";

    productFactory.getProduct($routeParams.productId).then(res => {
        $scope.product = res.data.result;
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
}
