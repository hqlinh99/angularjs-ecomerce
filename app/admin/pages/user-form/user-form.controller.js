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
        console.log(url)
        if ($scope.validateUrl(url)) {
            $scope.user.avatar = url;
            $scope.url = ""
            $('#exampleModal').modal('hide');
        }
    }

    $scope.clearAvatar = () => {
        console.log("??")
        $scope.user.avatar = "";
    }

    $scope.saveUser = (userId) => {
        if ($scope.validateForm()) {
            if (userId) {
                let check = confirm('Are you sure you want to update this user?');
                if (check) {
                    $scope.user.updatedAt = Date.now();
                    userFactory.update(userId, $scope.user)
                        .then(res => {
                            alert('Account updated successfully');
                            if ($scope.$parent.user.sub == userId) $scope.$parent.user.avatar = res.data.result.avatar;
                            $location.path('/users');
                        })
                        .catch(res => {
                            console.log(res.data.errors)
                            alert(res.data.errors);
                        });
                }
            } else {
                $scope.user.createdAt = Date.now();
                userFactory.create($scope.user)
                    .then(res => {
                        alert('User saved successfully');
                        $location.path('/users');
                    })
                    .catch(err => {
                        alert(err.statusText);
                    });
            }
        }
    }

    $scope.validate =
        {
            imageUrl: {
                status: false,
                message: ""
            },
            fullName: {
                status: false,
                message: ""
            }, username: {
                status: false,
                message: ""
            }, email: {
                status: false,
                message: ""
            }, role: {
                status: false,
                message: ""
            },
        }

    $scope.validateUrl = (url) => {
        if (url != null && url.indexOf('http') === 0) {
            $scope.validate.imageUrl.status = false;
            return true;
        } else {
            $scope.validate.imageUrl.status = true;
            $scope.validate.imageUrl.message = "url is not a valid!";
            return false;
        }
    }

    $scope.validateForm = () => {
        let check = true;
        if ($scope.user.fullName === "") {
            $scope.validate.fullName.status = true;
            $scope.validate.fullName.message = "full name is not empty!";
            check = false;
        } else {
            $scope.validate.fullName.status = false;
        }

        if ($scope.user.username === "") {
            $scope.validate.username.status = true;
            $scope.validate.username.message = "username is not empty!";
            check = false;
        } else {
            $scope.validate.username.status = false;
        }

        if ($scope.user.email === "") {
            $scope.validate.email.status = true;
            $scope.validate.email.message = "email is not empty!";
            check = false;
        } else {
            $scope.validate.email.status = false;
        }

        if (!$scope.user.email.includes("@")) {
            $scope.validate.email.status = true;
            $scope.validate.email.message = "email is not a valid email";
            check = false;
        } else {
            $scope.validate.email.status = false;
        }

        if ($scope.user.role === "") {
            $scope.validate.role.status = true;
            $scope.validate.role.message = "please choose a role!";
            check = false;
        } else {
            $scope.validate.role.status = false;
        }

        return check;
    }
}
