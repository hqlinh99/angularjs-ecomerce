window.signUpCtrl = function ($scope, $timeout, $location, authFactory) {
    $scope.user = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        repeatPassword: "",
        role: "CUSTOMER"
    }


    $scope.signUp = (user) => {
        checkRepeatPassword(user)
        {
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
    }

    function checkRepeatPassword(user) {
        if (user.password != user.repeatPassword) {
            alert("Passwords do not match");
            return false;
        }
        return true;
    }
}