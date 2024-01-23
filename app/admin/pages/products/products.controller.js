adminApp.controller("productsCtrl", ["$scope", "$timeout","productFactory", function ($scope, $timeout, productFactory) {
    $timeout(() => {

    })

    productFactory.getProducts().then((res) => $scope.products = res.data);
}]);
