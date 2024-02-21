window.signUpCtrl = function ($scope, $timeout, $location, authFactory) {
    $scope.user = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "CUSTOMER"
    }


    $scope.signUp = (user) => {
        if ($scope.myForm.$valid) {
            user.createdAt = Date.now();
            authFactory.signUp(user)
                .then((res) => {
                    alert("Sign up successfully!");
                    $location.path("/login");
                })
                .catch(function (err) {
                    if (err.status != -1)
                        err.data.errors.forEach(e => alert(e.errorMessage))
                    else alert("Cannot connect to server!");
                })
        }
        else
        {
            $scope.myForm.firstName.$touched = true;
            $scope.myForm.lastName.$touched = true;
            $scope.myForm.email.$touched = true;
            $scope.myForm.password.$touched = true;
            $scope.myForm.confirmPassword.$touched = true;
        }
    }

    $scope.matchPassword = () => {
        console.log("??")
        $scope.myForm.confirmPassword.$setValidity('matchPassword', $scope.user.password === $scope.user.confirmPassword);
    }
}