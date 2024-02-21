adminApp.config(function ($routeProvider, $httpProvider, $locationProvider) {
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
});
adminApp.controller('adminCtrl', ($scope, $cookies, jwtHelper, authService) => {
    let token = $cookies.get("refresh_token");
    if (token)
        $scope.$parent.user = jwtHelper.decodeToken(token);

    $scope.logout = () => {
        $cookies.remove("refresh_token");
        window.location.pathname = "/auth";
    }
});
adminApp.directive('isNumber', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            ngModelCtrl.$validators.isNumber = function (modelValue, viewValue) {
                if (ngModelCtrl.$isEmpty(modelValue)) {
                    // Giá trị rỗng được coi là hợp lệ
                    return true;
                }

                if (isNaN(parseFloat(viewValue)) || !isFinite(viewValue)) {
                    // Kiểm tra xem giá trị có phải là số hay không
                    return false;
                }

                return true;
            };
        }
    };
});

adminApp.directive('minValue', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            ngModelCtrl.$parsers.push(function (value) {
                if (isNaN(parseFloat(attrs.minValue)) || !isFinite(attrs.minValue)) {
                    var minValue = parseInt(attrs.minValue);
                    var check = value >= minValue;
                    ngModelCtrl.$setValidity('minValue', check);
                    return check ? value : undefined;
                } else {
                    return true;
                }

            });
        }
    };
});

adminApp.directive('maxValue', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            ngModelCtrl.$parsers.push(function (value) {
                var maxValue = parseInt(attrs.maxValue);
                var check = value <= maxValue;
                ngModelCtrl.$setValidity('maxValue', check);
                return check ? value : undefined;
                ;
            });
        }
    };
});