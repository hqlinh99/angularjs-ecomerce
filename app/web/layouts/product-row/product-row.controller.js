// myApp.controller("productRowCtrl", ["$scope", "productFactory", ($scope, productFactory) => {
//     productFactory.getProducts().then((res) => {
//         $scope.$parent.products = res.data
//     })
// }])

myApp.controller("productRowCtrl", function ($scope, productFactory) {
    productFactory.getProducts().then((res) => {
        $scope.$parent.products = res.data
    })
});