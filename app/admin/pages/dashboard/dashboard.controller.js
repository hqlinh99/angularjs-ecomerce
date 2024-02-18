window.dashboardCtrl = function ($scope, orderFactory, $location) {
    $scope.$parent.pageTitle = "Dashboard";

    orderFactory.getOrders().then((res) => {
        $scope.orders = res.data.result;
    });

    $scope.updateStatus = (id, status) => {
        orderFactory.updateStatus(id, status)
            .then((res) => {
                let order = $scope.orders.find(order => order.id === id);
                order.status = res.data.result.status;
            });

    }
}
