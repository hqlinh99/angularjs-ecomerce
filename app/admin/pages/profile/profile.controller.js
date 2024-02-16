window.profileCtrl = function ($scope, $routeParams, userFactory) {
    $scope.$parent.pageTitle = "Profile";


    //getuser form parameters angularjs

    userFactory.getUser($routeParams.userId)
        .then(function (res) {
            $scope.user = res.data.result;
        })
}