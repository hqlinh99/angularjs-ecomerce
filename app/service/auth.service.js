service.factory("authFactory", ($http) => {
    const host = "http://localhost:8080/api/v1";
    return {
        login: (user) => {
            return $http.post(`${host}/login`, user);
        },
        signUp: (user) => {
            return $http.post(`${host}/account`, user);
        },
        refreshToken: (refreshToken) => {
            return $http.post(`${host}/refresh-token`, refreshToken);
        }
    }
});

service.service('authService', function () {
    this.accessToken;
    this.setCookie = (name, value, expiresCookie) => {
        var expires = "";
        if (value) {
            var date = new Date();
            date.setTime(date.getTime() + expiresCookie);
            expires = "; expires=" + date.toUTCString();
        }

        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    this.checkRedirect = (roles) => {
        if (roles.includes("ROLE_CUSTOMER"))
            window.location.pathname = "/"
        else window.location.pathname = "/admin"
    }
});

service.factory("interceptor", function ($q, $location, $cookies,authService, $injector) {
    return {
        responseError: function (response) {
            let $http = $injector.get("$http");

            if (response.status === 401) {
                let refreshToken = $cookies.get("refresh_token");
                if (refreshToken === "") window.location.pathname = "/auth";

                return $http.post("http://localhost:8080/api/v1/refresh-token", {refreshToken: refreshToken})
                    .then((res) => {
                        let {accessToken, refreshToken} = res.data.result;
                        response.config.headers["Authorization"] = "Bearer " + accessToken;
                        authService.accessToken = accessToken;
                        authService.setCookie("refresh_token", refreshToken, 86400000);

                        return $http(response.config);
                    })
                    .catch((res) => {
                        if (res.status === 400 || res.status === 409) throw res;
                        res.data.errors.forEach(err => alert(err.errorMessage));
                        window.location.pathname = "/auth";
                    });
            }
            return $q.reject(response);
        }
    }
});
