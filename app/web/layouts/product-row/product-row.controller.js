
myApp.controller("productRowCtrl", function ($scope, productFactory) {
    productFactory.getProducts().then((res) => {
        $scope.$parent.products = res.data.result;
    })
});