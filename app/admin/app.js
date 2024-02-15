var adminApp = angular.module('adminApp', ["ngRoute", "authService"]);

adminApp.config(["$routeProvider", "$httpProvider", "$locationProvider", function ($routeProvider, $httpProvider, $locationProvider) {
    $httpProvider.interceptors.push('interceptor');
    $routeProvider
        .when("/dashboard", {
            templateUrl: "pages/dashboard/dashboard.html",
            controller: dashboardCtrl
        })
        .when("/products", {
            templateUrl: "pages/products/products.html",
            controller: productsCtrl
        })
        .when("/product-detail/:productId", {
            templateUrl: "pages/product-form/product-form.html",
            controller: productFormCtrl
        })
        .when("/add-product", {
            templateUrl: "pages/product-form/product-form.html",
            controller: productFormCtrl
        })
        .when("/medias", {
            templateUrl: "pages/media/media.html",
            controller: mediasCtrl
        })
        .when("/users", {
            templateUrl: "pages/users/users.html",
            controller: usersCtrl
        })
        .when("/user-detail/:userId", {
            templateUrl: "pages/user-form/user-form.html",
            controller: userFormCtrl
        })
        .when("/add-user", {
            templateUrl: "pages/user-form/user-form.html",
            controller: userFormCtrl
        })
        .otherwise({
            redirectTo: "/dashboard"
        });
    // $locationProvider.html5Mode({
    //     enabled: true,
    //     requireBase: true
    // });
}]);
adminApp.controller('adminCtrl', ($scope, authService) => {
    var token = authService.getCookie("access_token");
    if (token) {
        var auth = authService.getSubjectFromJWT(token);
        if (auth.roles.includes("CUSTOMER")) {
            alert("You dont have permission to access this admin page.");
            window.location.pathname = "/";
        }
    }

    $scope.logout = () => {
        authService.deleteCookie("refresh_token");
        window.location.pathname = "/auth";
    }

    $scope.user = null;
    $scope.products = [];
    $scope.product = {};
});

//create factory
adminApp.factory("productFactory", ["$http", ($http) => {
    const host = "http://localhost:3000";
    return {
        getProducts: () => {
            return $http.get(`${host}/products`);
        },
        getProduct: (id) => {
            return $http.get(`${host}/products/` + id);
        },
        create: (product) => {
            return $http.post(`${host}/products`, product);
        },
        update: (id, product) => {
            return $http.put(`${host}/products/` + id, product);
        },
        delete: (id) => {
            return $http.delete(`${host}/products/` + id);
        }
    }
}]);

adminApp.factory("userFactory", ($http, authService) => {
    const host = "http://localhost:8080/api/v1";
    return {
        getUsers: () => {
            return $http.get(`${host}/accounts`, {
                headers: {
                    'Authorization': 'Bearer ' + authService.accessToken
                }
            });
        },
        getUser: (id) => {
            return $http.get(`${host}/account/` + id, {
                headers: {
                    'Authorization': 'Bearer ' + authService.accessToken
                }
            });
        },
        create: (account) => {
            return $http.post(`${host}/account`, account);
        },
        update: (id, account) => {
            return $http.patch(`${host}/account/` + id, account, {
                headers: {
                    'Authorization': 'Bearer ' + authService.accessToken
                }
            });
        },
        delete: (id) => {
            return $http.delete(`${host}/account/` + id, {
                headers: {
                    'Authorization': 'Bearer ' + authService.accessToken
                }
            });
        }
    }
});