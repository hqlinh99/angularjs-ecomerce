window.productFormCtrl = function ($scope, $routeParams, productFactory, $location) {
    $scope.product =
        {
            name: "",
            description: "",
            price: 0,
            quantity: 0,
            productType: "",
            images: [],
        }

    if (productId = $routeParams.productId) {
        $scope.pageTitle = "Update Product";
        productFactory.getProduct(productId)
            .then(res => $scope.product = res.data.result)
            .catch(err => {
                alert(err.statusText);
                $location.path('/products');
            });
    } else {
        $scope.pageTitle = "Add New Product";

    }

    $scope.addImageUrl = (url) => {
        if ($scope.validateUrl(url)) {
            $scope.product.images.push(new String(url));
            $scope.url = ""
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
        if ($scope.validateForm()) {
            if (productId) {
                let check = confirm('Are you sure you want to update this product?');
                if (check) {
                    $scope.product.updatedAt = Date.now();
                    productFactory.update(productId, $scope.product)
                        .then(res => {
                            alert('Product updated successfully');
                            $location.path('/products');
                        })
                        .catch(res => {
                            res.data.errors.forEach(err => alert(err.errorMessage))
                        });
                }
            } else {
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
                        })
                    });
            }
        }
    }

    $scope.validate =
        {
            name: {
                status: false,
                message: ""
            }, price: {
                status: false,
                message: ""
            }, quantity: {
                status: false,
                message: ""
            }, productType: {
                status: false,
                message: ""
            }
        }

    $scope.validateUrl = (url) => {
        if (url && url.indexOf('http') !== 0) {
            alert("url is not a valid");
            return false;
        }

        if ($scope.product.images.includes(url)) {
            alert("url image already exists");
            return false;
        }

        return true;
    }

    $scope.validateForm = () => {
        let check = true;
        if ($scope.product.title === "") {
            $scope.validate.name.status = true;
            $scope.validate.name.message = "product title is not empty!";
            check = false;
        } else {
            $scope.validate.name.status = false;
        }

        if ($scope.product.productType === "") {
            $scope.validate.productType.status = true;
            $scope.validate.productType.message = "select productType, please!";
            check = false;
        } else {
            $scope.validate.productType.status = false;
        }

        return check;
    }
}
