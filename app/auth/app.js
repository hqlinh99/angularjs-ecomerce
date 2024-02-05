var authApp = angular.module('authApp', ["ngRoute", "authService"]);

authApp.config(["$routeProvider", "$locationProvider", function ($routeProvider, $locationProvider) {
    $routeProvider
        .when("/login", {
            templateUrl: "pages/login/login.html",
            controller: loginCtrl
        })
        .when("/sign-up", {
            templateUrl: "pages/signup/signup.html",
            controller: signUpCtrl
        })
        .when("/forgot-password", {
            templateUrl: "pages/forgot-password/forgot-password.html",
            controller: forgotPasswordCtrl
        })
        .otherwise({
            redirectTo: "/login"
        });
    // $locationProvider.html5Mode({
    //     enabled: true,
    //     requireBase: true
    // });
}]);
authApp.controller('authCtrl', ($scope, authService) => {
    // var token = authService.getCookie("access_token");
    // if (token) {
    //     var auth = authService.getSubjectFromJWT(token);
    //     authService.checkRedirect(auth.roles);
    // }
});


