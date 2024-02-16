window.usersCtrl = function ($scope, $timeout, userFactory) {
    if ($scope.$parent.user.roles[0] === "ROLE_CUSTOMER") $location.path("/");

    $timeout(function () {
    });

    $scope.getAll = () => {
        userFactory.getUsers().then((res) => {
            $scope.users = res.data.result;
            angular.element(document).ready(function () {
                dTable = $('#dataTable')
                dTable.DataTable();
            });
        }).catch((err) => {
            console.log("user.controller::getAllUser " + err);
        });
    }

    $scope.deleteUser = (id) => {
        let check = confirm('Are you sure you want to delete this user?');
        if (check) {
            userFactory.delete(id).then((res) => {
                $scope.getAll();
            });
        }
    }

    $scope.getAll();

}