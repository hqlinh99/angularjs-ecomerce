myApp.controller("checkoutCtrl", ["$scope", "$timeout", "$location", function ($scope, $timeout, $location) {
    $timeout(() => {
        // <script src='layout/menu/footer.controller.js'></script>
    })

    if (!$scope.$parent.cart.length) {
        $location.path('/');
    }
}]);
