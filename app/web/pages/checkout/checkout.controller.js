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

    $scope.paymentMethod = "CASH";

    $scope.checkout = (order) => {
        if ($scope.myForm.$valid) {
            order.payment = {method: $scope.paymentMethod}

            orderFactory.create(order)
                .then((res) => {
                    let orderResut = res.data.result;
                    if (orderResut.payment.urlVNPAY)
                        window.location.href = orderResut.payment.urlVNPAY;
                    else {
                        alert('Place Order successfully');
                        $scope.$parent.cart.data = [];
                        $location.path('/');
                    }
                });

        } else {
            $scope.myForm.email.$touched = true;
            $scope.myForm.fullName.$touched = true;

        }
    };

}
