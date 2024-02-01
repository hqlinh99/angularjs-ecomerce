window.productFormCtrl = function ($scope, $routeParams, productFactory, $location) {
    $scope.product =
        {
            title: "",
            description: "",
            price: "",
            quantity: "",
            category: "",
            images: [],
        }

    if (productId = $routeParams.productId) {
        $scope.pageTitle = "Update Product";
        productFactory.getProduct(productId)
            .then(res => $scope.product = res.data)
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
                        .catch(err => {
                            alert(err.statusText);
                        });
                }
            } else {
                $scope.product.createdAt = Date.now();
                productFactory.create($scope.product)
                    .then(res => {
                        alert('Product saved successfully');
                        $location.path('/products');
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
            productName: {
                status: false,
                message: ""
            }, price: {
                status: false,
                message: ""
            }, quantity: {
                status: false,
                message: ""
            }, category: {
                status: false,
                message: ""
            }
        }

    $scope.validateUrl = (url) => {
        if (url != null && url.indexOf('https://') === 0) {
            $scope.validate.imageUrl.status = false;

        } else {
            $scope.validate.imageUrl.status = true;
            $scope.validate.imageUrl.message = "url is not a valid!";
            return false;
        }

        if ($scope.product.images.includes(url)) {
            $scope.validate.imageUrl.status = true;
            $scope.validate.imageUrl.message = "url is duplicated!";
            return false;
        } else $scope.validate.imageUrl.status = false;

        return true;
    }

    $scope.validateForm = () => {
        let check = true;
        if ($scope.product.title === "") {
            $scope.validate.productName.status = true;
            $scope.validate.productName.message = "product title is not empty!";
            check = false;
        } else {
            $scope.validate.productName.status = false;
        }

        if ($scope.product.category === "") {
            $scope.validate.category.status = true;
            $scope.validate.category.message = "select category, please!";
            check = false;
        } else {
            $scope.validate.category.status = false;
        }


        return check;
    }
}
