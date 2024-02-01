window.usersCtrl = function ($scope, $timeout, userFactory) {

    $timeout(function () {
    });

    $scope.getAll = () => {
        userFactory.getUsers().then((res) => {
            $scope.users = res.data;
            angular.element(document).ready(function () {
                dTable = $('#dataTable')
                dTable.DataTable();
            });
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