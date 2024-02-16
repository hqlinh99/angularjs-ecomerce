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
authApp.controller('authCtrl', ($scope, $cookies, authService) => {
    var auth = authService.getSubjectFromJWT($cookies.get("refresh_token"));
    if (auth) authService.checkRedirect(auth.roles);
});


