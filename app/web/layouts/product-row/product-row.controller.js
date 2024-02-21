myApp.controller("productRowCtrl", function ($scope, productFactory) {
    $scope.loader.style.display = "block";
    productFactory.getProducts().then((res) => {
        $scope.loader.style.display = "none";
        $scope.$parent.products = res.data.result;
    })
});