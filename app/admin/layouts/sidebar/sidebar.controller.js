adminApp.controller('sidebarCtrl', ($scope) => {
    $scope.background = () => {
        if ($scope.$parent.user.roles[0] === 'ROLE_CUSTOMER') return 'bg-gradient-secondary';
        if ($scope.$parent.user.roles[0] === 'ROLE_MANAGER') return 'bg-gradient-success';
        if ($scope.$parent.user.roles[0] === 'ROLE_SUB_MANAGER') return 'bg-gradient-warning';
        return 'bg-gradient-primary'
    }
});