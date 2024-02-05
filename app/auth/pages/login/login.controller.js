window.loginCtrl = function ($scope, $timeout, authFactory, authService) {
    $scope.login = (user) => {
        authFactory.login(user)
            .then((res) => {
                //Chua fix loi!!
                let {accessToken, refreshToken} = res.data.result;
                authService.accessToken = accessToken;
                authService.setCookie("refresh_token", refreshToken, 86400000);
                let roles = authService.getSubjectFromJWT(accessToken).roles;
                authService.checkRedirect(roles);
            })
            .catch(function (err) {
                if (err.status != -1)
                    err.data.errors.forEach(e => alert(e.errorMessage))
                else alert("Cannot connect to server!");
            })
    }


}