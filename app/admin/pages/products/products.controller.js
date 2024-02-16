window.productsCtrl = function ($scope, $location, productFactory) {
    if ($scope.$parent.user.roles[0] === "ROLE_CUSTOMER") $location.path("/");
    $scope.$parent.pageTitle = "Product List";

    $scope.getAll = () => {
        productFactory.getProducts().then((res) => {
            $scope.products = res.data.result;
            angular.element(document).ready(function () {
                dTable = $('#dataTable')
                dTable.DataTable();
            });
        });
    }

    $scope.deleteProduct = (id) => {
        let check = confirm('Are you sure you want to delete this product?');
        if (check) {
            productFactory.delete(id).then((res) => {
                $scope.getAll();
            });
        }
    }

    $scope.getAll();

}