myApp.controller("checkoutCtrl", ["$scope", "$timeout", "$location", function ($scope, $timeout, $location) {
    $timeout(() => {
        // <script src='layout/menu/cart.controller.js'></script>
    })

    if (!$scope.$parent.cart.data.length) {
        $scope.$parent.notify.create({type: "warning", message: "Cart is empty, return to the homepage!"});
        setTimeout(() => {
            $location.path('/');
        }, 3000)
    }

    $scope.increase = (index) => {
        if (index !== -1) {
            $scope.$parent.cart.data[index].quantity += 1;
        }
    }
    
    $scope.decrease = (index) => {
        console.log($scope.$parent.cart.data[index].quantity);
        if (index !== -1 && $scope.$parent.cart.data[index].quantity > 1) {
            $scope.$parent.cart.data[index].quantity -= 1;
        }
    }
}]);
