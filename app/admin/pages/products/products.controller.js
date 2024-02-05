window.productsCtrl = function ($scope, $timeout, productFactory) {
    console.log("Product");
    $timeout(function () {
    });

    $scope.getAll = () => {
        productFactory.getProducts().then((res) => {
            $scope.products = res.data;
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