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
        .when("/profile/:userId", {
            templateUrl: "pages/profile/profile.html",
            controller: profileCtrl
        })
        .otherwise({
            redirectTo: "/dashboard"
        });
    // $locationProvider.html5Mode({
    //     enabled: true,
    //     requireBase: true
    // });
}]);
adminApp.controller('adminCtrl', ($scope, $cookies, authService) => {
    $scope.$parent.user = authService.getSubjectFromJWT($cookies.get("refresh_token"));
    $scope.logout = () => {
        authService.deleteCookie("refresh_token");
        window.location.pathname = "/auth";
    }

});