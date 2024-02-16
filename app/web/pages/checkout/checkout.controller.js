window.checkoutCtrl =  function ($scope, $timeout, $location) {
    $timeout(() => {
        // <script src='layout/menu/cart.controller.js'></script>
    })

    if (!$scope.$parent.cart.data.length) {
        $scope.$parent.notify.create({ type: "warning", message: "Cart is empty, return to the homepage!" });
        setTimeout(() => {
            $location.path('/');
        }, 1)
    }

    $scope.user = {};

    $scope.checkout = () => {
        if ($scope.user.email && $scope.user.cardHolder) {
            alert('Order successfully placed! -> info:: '+ JSON.stringify($scope.$parent.cart));
            $scope.$parent.cart.data = [];
            $location.path('/');
        } else {
            alert('Please fill all the required fields.');
        }
    };
}
