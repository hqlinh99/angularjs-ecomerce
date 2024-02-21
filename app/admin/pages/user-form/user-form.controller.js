window.userFormCtrl = function ($scope, $routeParams, userFactory, $location) {
    if ($scope.$parent.user.roles[0] === "ROLE_CUSTOMER") $location.path("/");
    $scope.user =
        {
            avatar: "",
            username: "",
            firstName: "",
            lastName: "",
            email: "",
            biography: "",
            role: "",
        }

    if (userId = $routeParams.userId) {
        $scope.$parent.pageTitle = "Update User"
        userFactory.getUser(userId)
            .then(res => $scope.user = res.data.result)
            .catch(err => {
                alert(err.statusText);
                $location.path('/users');
            });
    } else {
        $scope.$parent.pageTitle = "Add New User"

    }

    $scope.addImageUrl = (url) => {
        $scope.user.avatar = url;
        $scope.clearImageSelected();
        $('#exampleModal').modal('hide');
    }

    $scope.clearAvatar = () => {
        $scope.user.avatar = "";
    }

    $scope.saveUser = (userId) => {
        if ($scope.myForm.$valid) {
            console.log("ahahaha");
            if (userId) {
                $scope.checked = confirm('Are you sure you want to update this user?');
                if ($scope.checked) {
                    $scope.user.updatedAt = Date.now();
                    userFactory.update(userId, $scope.user)
                        .then(res => {
                            alert('Account updated successfully');
                            if ($scope.$parent.user.sub == userId) $scope.$parent.user.avatar = res.data.result.avatar;
                            $location.path('/users');
                        })
                        .catch(res => {
                            res.data.errors.forEach(err => alert(err.errorMessage));
                            $scope.checked = false;
                        });
                }
            } else {
                $scope.checked = true;
                $scope.user.createdAt = Date.now();
                $scope.user.password = "123456";
                userFactory.create($scope.user)
                    .then(res => {
                        alert('User saved successfully with password is 123456');
                        $location.path('/users');
                    })
                    .catch(res => {
                        res.data.errors.forEach(err => alert(err.errorMessage));
                        $scope.checked = false;
                    });
            }
        } else {
            $scope.myForm.firstName.$touched = true;
            $scope.myForm.lastName.$touched = true;
            $scope.myForm.username.$touched = true;
            $scope.myForm.email.$touched = true;
            $scope.myForm.role.$touched = true;
        }
    }

    $scope.checkPasswordsMatch = function () {
        if (scope.user.id)
            $scope.myForm.confirmPassword
                .$setValidity('passwordMismatch', false);
        else
            $scope.myForm.confirmPassword
                .$setValidity('passwordMismatch', $scope.user.password === $scope.user.confirmPassword);
    };
}
