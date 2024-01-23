myApp.controller("notifyCtrl", ["$scope", ($scope) => {
    $scope.detach = (index) => {
        $scope.$parent.notify.data.splice(index, 1);
    }
}]);