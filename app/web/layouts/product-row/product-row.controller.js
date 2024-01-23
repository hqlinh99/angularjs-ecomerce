myApp.controller("productRowCtrl", ["$scope", "productFactory", ($scope, productFactory) => {
    productFactory.getProducts().then((res) => {
        console.log(res.data);
        $scope.$parent.products = res.data
    })

    $scope.addToCart = (product) => {
        $scope.$parent.notify.create({type: "success", message: "Product " + product.title + product.id + " has already been added to cart"});
    }
}])