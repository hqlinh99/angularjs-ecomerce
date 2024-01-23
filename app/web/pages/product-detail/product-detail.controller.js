myApp.controller("productDetailCtrl", ["$scope", "$timeout", "$routeParams", "$location","productFactory", function ($scope, $timeout, $routeParams, $location,productFactory) {
    $timeout(() => {
        // <script src='layout/menu/cart.controller.js'></script>
    })

    productFactory.getProduct($routeParams.productId).then(res => {
        $scope.product = res.data;
        $scope.imageSelectedIndex = 0;
    });

    $scope.cartItem = {
        product: $scope.product,
        quantity: 1,
    }

    $scope.setImageSelectedIndex = (index) => {
        if (index >= 0 && index < $scope.product.images.length)
            $scope.imageSelectedIndex = index;
    }

    $scope.addToCart = (product) => {
        let cartItem = {
            product: product,
            quantity: 1
        }
        $scope.$parent.cart.add(cartItem);

        $scope.$parent.notify.create({
            type: "success",
            message: "Product " + product.title + " has already been added to cart"
        });
    }

    $scope.buyProduct = () => {
        let cartItemCopy = angula.copy($scope.cartItem);
        //1. Thêm vào giỏ hàng, kiểm tra...


        //2. Chuyển hướng đến trang checkout
        $location.path("/checkout");
    }
}]);
