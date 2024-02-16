service.factory("fileUploadFactory", ($http, authService) => {
    const host = "http://localhost:8080/api/v1";
    return {
        getFileUploads: () => {
            return $http.get(`${host}/file-uploads`, {
                headers: {
                    'Authorization': 'Bearer ' + authService.accessToken
                }
            });
        },
        getFileUpload: (id) => {
            return $http.get(`${host}/file-upload/` + id, {
                headers: {
                    'Authorization': 'Bearer ' + authService.accessToken
                }
            });
        },
        create: (file) => {
            var formData = new FormData();
            formData.append('multipartFile', file);
            return $http.post(`${host}/file-upload`, formData, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined,
                    'Authorization': 'Bearer ' + authService.accessToken
                }
            });
        },
        update: (id, fileUpload) => {
            return $http.patch(`${host}/file-upload/` + id, fileUpload, {
                headers: {
                    'Authorization': 'Bearer ' + authService.accessToken
                }
            });
        },
        delete: (id) => {
            return $http.delete(`${host}/file-upload/` + id, {
                headers: {
                    'Authorization': 'Bearer ' + authService.accessToken
                }
            });
        }
    }
});