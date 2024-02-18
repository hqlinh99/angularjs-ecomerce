myApp.controller("userCtrl", ($scope, authService) => {
    $scope.logout = () => {
        authService.deleteCookie("refresh_token");
        window.location.pathname = "/";
        window.location.reload();
    }
});