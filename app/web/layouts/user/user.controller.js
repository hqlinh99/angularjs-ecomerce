myApp.controller("userCtrl", ($scope, authService) => {
    console.log(authService.accessToken);
    var user = authService.getSubjectFromJWT(authService.accessToken);
    console.log(user);

    $scope.logout = () => {
        authService.deleteCookie("refresh_token");
        window.location.pathname = "/";
        window.location.reload();
    }
});