window.loginCtrl = function ($scope, $timeout, $cookies,authFactory, authService, $window) {
    $scope.login = (user) => {
        authFactory.login(user)
            .then((res) => {
                //Chua fix loi!!
                let {refreshToken} = res.data.result;
                authService.setCookie("refresh_token", refreshToken, 86400000);
                let roles = authService.getSubjectFromJWT(refreshToken).roles;
                authService.checkRedirect(roles);
            })
            .catch(function (err) {
                if (err.status != -1)
                    err.data.errors.forEach(e => alert(e.errorMessage))
                else alert("Cannot connect to server!");
            })
    }

    $scope.socialLogin = function (provider) {
        let socialUrl = "http://localhost:8080/oauth2/authorization/" + provider;
        // var googleLoginWindow = window.open(socialUrl, "googleLoginWindow", 'width=500,height=600');
        var googleLoginWindow = popupWindow(socialUrl, "SocialLogin", 500, 600)

        var interval = setInterval(function () {
            if (!googleLoginWindow.frames) {
                let roles = authService.getSubjectFromJWT($cookies.get("refresh_token")).roles;
                authService.checkRedirect(roles);
                clearInterval(interval);
            }
        }, 500)
    };

    function popupWindow(url, title, w, h) {
        var left = (screen.width / 2) - (w / 2);
        var top = (screen.height / 2) - (h / 2);
        return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
    }
}