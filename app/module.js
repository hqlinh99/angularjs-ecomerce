var service = angular.module('service', []);
var myApp = angular.module('myApp', ["ngRoute", "ngCookies", "ngMessages", "angular-jwt", "service"]);
var adminApp = angular.module('adminApp', ["ngRoute", "ngCookies", "ngMessages", "angular-jwt", "service"]);
var authApp = angular.module('authApp', ["ngRoute", "ngCookies", "ngMessages", "angular-jwt", "service"]);
