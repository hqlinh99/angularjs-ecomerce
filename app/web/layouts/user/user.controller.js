myApp.controller("userCtrl", ($scope, $cookies, authService) => {
    $scope.user = authService.getSubjectFromJWT($cookies.get("refresh_token"));

    $scope.logout = () => {
        authService.deleteCookie("refresh_token");
        window.location.pathname = "/";
        window.location.reload();
    }
});