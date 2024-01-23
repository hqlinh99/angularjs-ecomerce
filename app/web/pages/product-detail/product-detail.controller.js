myApp.controller("productDetailCtrl", ["$scope", "$timeout", "$routeParams", "$location", "productFactory", function ($scope, $timeout, $routeParams, $location, productFactory) {
    $timeout(() => {
        // <script src='layout/menu/cart.controller.js'></script>
    })

    productFactory.getProduct($routeParams.productId).then(res => {
        $scope.product = res.data;
        $scope.cartItem = {
            product: $scope.product,
            quantity: $scope.cartItem.quantity,
        }
        $scope.imageSelectedIndex = 0;
    });

    $scope.setImageSelectedIndex = (index) => {
        if (index >= 0 && index < $scope.product.images.length)
            $scope.imageSelectedIndex = index;
    }

    $scope.addToCart = (product) => {
        let cartItem = {
            product: product,
            quantity: 1
        }

        var existingProduct = $scope.$parent.cart.data.find(i => i.product.id === cartItem.product.id);
        if (existingProduct) {
            $scope.$parent.notify.create({
                type: "warning",
                message: "Product " + product.title + product.id + " existed in cart"
            });
        } else {
            $scope.$parent.cart.add(cartItem);

            $scope.$parent.notify.create({
                type: "success",
                message: "Product " + product.title + " has already been added to cart"
            });
        }
    }

    $scope.buyProduct = () => {
        let cartItemCopy = angular.copy($scope.cartItem);
        //1. Thêm vào giỏ hàng, kiểm tra...
        var existingProduct = $scope.$parent.cart.data.find(i => i.product.id === cartItemCopy.product.id);
        if (existingProduct) {
            $scope.$parent.notify.create({
                type: "warning",
                message: "Product " + cartItemCopy.product.title + cartItemCopy.product.id + " existed in cart"
            });
        } else {
            $scope.$parent.cart.add(cartItemCopy);

            $scope.$parent.notify.create({
                type: "success",
                message: "Product " + cartItemCopy.product.title + " has already been added to cart"
            });
        }

        //2. Chuyển hướng đến trang checkout
        $location.path("/checkout");
    }
}]);
