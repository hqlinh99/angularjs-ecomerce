myApp.controller("productRowCtrl", ["$scope", "productFactory", ($scope, productFactory) => {
    productFactory.getProducts().then((res) => {
        console.log(res.data);
        $scope.$parent.products = res.data
    })

    $scope.addToCart = (product) => {
        //Kiểm tra nếu có thì không thêm và cũng không cộng dồn vào giỏ hàng, nhưng chỉ hiện thông báo.
        //Mặc định số lượng sẽ là 1.

        let cartItem = {
            product: product,
            quantity: 1
        }

        var existingProduct = $scope.$parent.cart.data.find(i => i.product.id === cartItem.product.id);
        if (existingProduct) {
            $scope.$parent.notify.create({
                type: "warning",
                message: "Product " + product.title + product.id + " existed in cart"
            });
        } else {
            $scope.$parent.cart.add(cartItem);

            $scope.$parent.notify.create({
                type: "success",
                message: "Product " + product.title + product.id + " has already been added to cart"
            });
        }
    }
}])