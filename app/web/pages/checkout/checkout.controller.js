window.checkoutCtrl = function ($scope, $location, $http, orderFactory) {
    if (!$scope.$parent.user) {
        window.location.href = "/auth";
    }

    $scope.$parent.pageTitle = "Checkout";

    if (!$scope.$parent.cart.data.length) {
        $scope.$parent.notify.create({type: "warning", message: "Cart is empty, return to the homepage!"});
        setTimeout(() => {
            $location.path('/');
        }, 1)
    }

    $scope.checkout = (order) => {
        if ($scope.user.email && $scope.user.fullName) {

            orderFactory.create(order)
                .then((res) => {
                    if (res.data.result.urlVNPAY)
                        window.location.href = res.data.result.urlVNPAY;
                    else {
                        alert('Place Order successfully');
                        $scope.$parent.cart.data = [];
                        $location.path('/');
                    }
                })
        } else {
            alert('Please fill all the required fields.');
        }
    };

}
