service.factory("productFactory", ($http, authService) => {
    const host = "http://localhost:8080/api/v1";
    return {
        getProducts: () => {
            return $http.get(`${host}/products`);
        },
        getProduct: (id) => {
            return $http.get(`${host}/product/` + id);
        },
        create: (product) => {
            return $http.post(`${host}/product`, product, {
                headers: {
                    'Authorization': 'Bearer ' + authService.accessToken
                }
            });
        },
        update: (id, product) => {
            product.price = Number(product.price);
            product.quantity = Number(product.quantity);
            return $http.patch(`${host}/product/` + id, product, {
                headers: {
                    'Authorization': 'Bearer ' + authService.accessToken
                }
            });
        },
        delete: (id) => {
            return $http.delete(`${host}/product/` + id, {
                headers: {
                    'Authorization': 'Bearer ' + authService.accessToken
                }
            });
        }
    }
});