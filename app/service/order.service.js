service.factory("orderFactory", ($http, authService) => {
    const host = "http://localhost:8080/api/v1";
    return {
        getOrders: (status) => {
            if (status)
                return $http.get(`${host}/orders?status=` + status, {
                    headers: {
                        'Authorization': 'Bearer ' + authService.accessToken
                    }
                });
            return $http.get(`${host}/orders`, {
                headers: {
                    'Authorization': 'Bearer ' + authService.accessToken
                }
            });
        },
        getOrder: (id) => {
            return $http.get(`${host}/order/` + id, {
                headers: {
                    'Authorization': 'Bearer ' + authService.accessToken
                }
            });
        },
        create: (order) => {
            return $http.post(`${host}/order`, order, {
                headers: {
                    'Authorization': 'Bearer ' + authService.accessToken
                }
            });
        },
        updateStatus: (id, status) => {
            return $http.patch(`${host}/order/` + id + '/status', status, {
                headers: {
                    'Authorization': 'Bearer ' + authService.accessToken
                }
            });
        },
        update: (id, order) => {
            return $http.patch(`${host}/order/` + id, order, {
                headers: {
                    'Authorization': 'Bearer ' + authService.accessToken
                }
            });
        },
        delete: (id) => {
            return $http.delete(`${host}/order/` + id, {
                headers: {
                    'Authorization': 'Bearer ' + authService.accessToken
                }
            });
        }
    }
});