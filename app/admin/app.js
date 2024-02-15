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
adminApp.factory("productFactory", ($http, authService) => {
    const host = "http://localhost:8080/api/v1";
    return {
        getProducts: () => {
            return $http.get(`${host}/products`);
        },
        getProduct: (id) => {
            return $http.get(`${host}/product/` + id);
        },
        create: (product) => {
            return $http.post(`${host}/product`, product, {
                headers: {
                    'Authorization': 'Bearer ' + authService.accessToken
                }
            });
        },
        update: (id, product) => {
            product.price = Number(product.price);
            product.quantity = Number(product.quantity);
            return $http.patch(`${host}/product/` + id, product, {
                headers: {
                    'Authorization': 'Bearer ' + authService.accessToken
                }
            });
        },
        delete: (id) => {
            return $http.delete(`${host}/product/` + id, {
                headers: {
                    'Authorization': 'Bearer ' + authService.accessToken
                }
            });
        }
    }
});

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
            return $http.post(`${host}/account`, account, {
                headers: {
                    'Authorization': 'Bearer ' + authService.accessToken
                }
            });
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

adminApp.factory("fileUploadFactory", ($http, authService) => {
    const host = "http://localhost:8080/api/v1";
    return {
        getFileUploads: () => {
            return $http.get(`${host}/file-uploads`, {
                headers: {
                    'Authorization': 'Bearer ' + authService.accessToken
                }
            });
        },
        getFileUpload: (id) => {
            return $http.get(`${host}/file-upload/` + id, {
                headers: {
                    'Authorization': 'Bearer ' + authService.accessToken
                }
            });
        },
        create: (file) => {
            var formData = new FormData();
            formData.append('multipartFile', file);
            return $http.post(`${host}/file-upload`, formData, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined,
                    'Authorization': 'Bearer ' + authService.accessToken
                }
            });
        },
        update: (id, fileUpload) => {
            return $http.patch(`${host}/file-upload/` + id, fileUpload, {
                headers: {
                    'Authorization': 'Bearer ' + authService.accessToken
                }
            });
        },
        delete: (id) => {
            return $http.delete(`${host}/file-upload/` + id, {
                headers: {
                    'Authorization': 'Bearer ' + authService.accessToken
                }
            });
        }
    }
});