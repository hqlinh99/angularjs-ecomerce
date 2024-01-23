myApp.controller("productDetailCtrl", ["$scope", "$timeout", "$routeParams", "productFactory", function ($scope, $timeout, $routeParams, productFactory) {
    $timeout(() => {
        // <script src='layout/menu/cart.controller.js'></script>
    })

    console.log($routeParams.productId);
    productFactory.getProduct($routeParams.productId).then((res) => {
        console.log(res.data);
        $scope.$parent.product = res.data
    })

    $scope.addToCart = (product) => {
        $scope.$parent.notify.create({type: "success", message: "Product " + product.title + product.id + " has already been added to cart"});
    }
}]);
