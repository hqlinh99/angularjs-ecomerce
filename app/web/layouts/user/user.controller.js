myApp.controller("userCtrl", ($scope, $cookies, authService) => {
    $scope.logout = () => {
        $cookies.remove("refresh_token");
        window.location.pathname = "/";
        window.location.reload();
    }
});