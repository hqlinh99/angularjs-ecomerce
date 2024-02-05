var authService = angular.module('authService', []);

authService.factory("authFactory", ($http) => {
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

authService.factory("authFactory", ($http) => {
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

authService.service('authService', function () {
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

    this.getCookie = (cname) => {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    this.deleteCookie = (name) => {
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    }

    this.getSubjectFromJWT = (jwt) => {
        if (jwt) {
            var tokens = jwt.split(".");
            return JSON.parse(atob(tokens[1]));
        }
        return null;
    }
    this.checkRedirect = (roles) => {
        if (roles.includes("CUSTOMER"))
            window.location.pathname = "/"
        else window.location.pathname = "/admin"
    }
});

authService.factory("interceptor", function ($q, $location, authService, $injector) {
    return {
        responseError: function (response) {
            let $http = $injector.get("$http");
            if (response.status === 401) {
                let refreshToken = authService.getCookie("refresh_token");
                if (refreshToken === "") window.location.pathname = "/auth";

                return $http.post("http://localhost:8080/api/v1/refresh-token", {refreshToken: refreshToken})
                    .then((res) => {
                        let {accessToken, refreshToken} = res.data.result;

                        response.config.headers["Authorization"] = "Bearer " + accessToken;
                        authService.accessToken = accessToken;
                        authService.setCookie("refresh_token", refreshToken, 86400000);

                        return $http(response.config);
                    })
                    .catch((error) => {
                        console.log(error)
                        window.location.pathname = "/auth";
                    })
            }
            return $q.reject(response);
        }
    }
});
