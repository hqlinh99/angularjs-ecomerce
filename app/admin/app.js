var adminApp = angular.module('adminApp', ["ngRoute"]);

adminApp.config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
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
            redirectTo: "/products"
        });
    // $locationProvider.html5Mode({
    //     enabled: true,
    //     requireBase: true
    // });
}]);
adminApp.controller('adminCtrl', ($scope) => {
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

adminApp.factory("userFactory", ["$http", ($http) => {
    const host = "http://localhost:3000";
    return {
        getUsers: () => {
            return $http.get(`${host}/users`);
        },
        getUser: (id) => {
            return $http.get(`${host}/users/` + id);
        },
        create: (account) => {
            return $http.post(`${host}/users`, account);
        },
        update: (id, account) => {
            return $http.put(`${host}/users/` + id, account);
        },
        delete: (id) => {
            return $http.delete(`${host}/users/` + id);
        }
    }
}]);