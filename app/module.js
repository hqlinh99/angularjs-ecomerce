var service = angular.module('service', []);
var myApp = angular.module('myApp', ["ngRoute", "ngCookies", "service"]);
var adminApp = angular.module('adminApp', ["ngRoute", "ngCookies", "service"]);
var authApp = angular.module('authApp', ["ngRoute", "ngCookies", "service"]);
