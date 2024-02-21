window.productFormCtrl = function ($scope, $routeParams, productFactory, $location) {
    if ($scope.$parent.user.roles[0] === "ROLE_CUSTOMER") $location.path("/");

    $scope.product = {
        name: "",
        description: "",
        price: "",
        quantity: "",
        productType: "",
        images: []
    }

    if (productId = $routeParams.productId) {
        $scope.$parent.pageTitle = "Update Product";
        productFactory.getProduct(productId)
            .then(res => $scope.product = res.data.result)
            .catch(err => {
                alert(err.statusText);
                $location.path('/products');
            });
    } else {
        $scope.$parent.pageTitle = "Add New Product";

    }

    $scope.addImageUrl = (url) => {
        if ($scope.validateUrl(url)) {
            $scope.product.images.push(url);
            $scope.clearImageSelected();
            $('#exampleModal').modal('hide');
        }
    }

    $scope.removeImageUrl = (index) => {
        let check = confirm("Are you sure you want to remove this image");
        if (check) {
            $scope.product.images.splice(index, 1);
        }
    }

    $scope.saveProduct = (productId) => {
        if ($scope.myForm.$valid) {
            if (productId) {
                $scope.checked  = confirm('Are you sure you want to update this product?');
                if ($scope.checked) {
                    $scope.product.updatedAt = Date.now();
                    productFactory.update(productId, $scope.product)
                        .then(res => {
                            alert('Product updated successfully');
                            $location.path('/products');
                        })
                        .catch(res => {
                            res.data.errors.forEach(err => {
                                if (err.field.includes('name')) {
                                    $scope.validate.name.status = true;
                                    $scope.validate.name.message = err.errorMessage;
                                    return;
                                }

                                if (err.field.includes('price')) {
                                    $scope.validate.price.status = true;
                                    $scope.validate.price.message = err.errorMessage;
                                    return;
                                }
                            });
                            $scope.checked = false;
                        });
                }
            } else {
                $scope.checked = true;
                $scope.product.createdAt = Date.now();
                productFactory.create($scope.product)
                    .then(res => {
                        alert('Product saved successfully');
                        $location.path('/products');
                    })
                    .catch(res => {
                        res.data.errors.forEach(err => {
                            if (err.field.includes('name')) {
                                $scope.validate.name.status = true;
                                $scope.validate.name.message = err.errorMessage;
                            } else $scope.validate.name.status = false;
                            if (err.field.includes('price')) {
                                $scope.validate.price.status = true;
                                $scope.validate.price.message = err.errorMessage;
                            } else $scope.validate.price.status = false;
                            if (err.field.includes('quantity')) {
                                $scope.validate.quantity.status = true;
                                $scope.validate.quantity.message = err.errorMessage;
                            } else $scope.validate.quantity.status = false;
                            if (err.field.includes('productType')) {
                                $scope.validate.productType.status = true;
                                $scope.validate.productType.message = err.errorMessage;
                            } else $scope.validate.productType.status = false;
                        });
                        $scope.checked = false;
                    });
            }
        }
        else
        {
            $scope.myForm.name.$touched = true;
            $scope.myForm.price.$touched = true;
            $scope.myForm.quantity.$touched = true;
            $scope.myForm.productType.$touched = true;
        }
    }

    $scope.validateUrl = (url) => {
        if ($scope.product.images.includes(url)) {
            alert("image already exists");
            return false;
        }
        return true;
    }
}

