myApp.controller("cartCtrl", ["$scope", ($scope) => {
    $scope.increase = (index) => {
        if (index !== -1) {
            $scope.$parent.cart.data[index].quantity += 1;
        }
    }

    $scope.decrease = (index) => {
        if (index !== -1 && $scope.$parent.cart.data[index].quantity > 1) {
            $scope.$parent.cart.data[index].quantity -= 1;
        }
    }
}])