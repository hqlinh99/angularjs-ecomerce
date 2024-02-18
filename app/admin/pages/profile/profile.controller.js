window.profileCtrl = function ($scope, $routeParams, userFactory, orderFactory) {
    $scope.$parent.pageTitle = "Profile";

    userFactory.getUser($routeParams.userId)
        .then(function (res) {
            $scope.user = res.data.result;
        });

    orderFactory.getOrders('APPROVED').then((res) => {
        $scope.orders = res.data.result;
    });
}