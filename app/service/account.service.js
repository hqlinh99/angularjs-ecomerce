service.factory("userFactory", ($http, authService) => {
    const host = "http://localhost:8080/api/v1";
    return {
        getUsers: () => {
            return $http.get(`${host}/accounts`, {
                headers: {
                    'Authorization': 'Bearer ' + authService.accessToken
                }
            });
        },
        getUser: (id) => {
            return $http.get(`${host}/account/` + id, {
                headers: {
                    'Authorization': 'Bearer ' + authService.accessToken
                }
            });
        },
        create: (account) => {
            return $http.post(`${host}/account`, account, {
                headers: {
                    'Authorization': 'Bearer ' + authService.accessToken
                }
            });
        },
        update: (id, account) => {
            return $http.patch(`${host}/account/` + id, account, {
                headers: {
                    'Authorization': 'Bearer ' + authService.accessToken
                }
            });
        },
        delete: (id) => {
            return $http.delete(`${host}/account/` + id, {
                headers: {
                    'Authorization': 'Bearer ' + authService.accessToken
                }
            });
        }
    }
});