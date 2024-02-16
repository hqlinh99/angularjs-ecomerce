adminApp.component('mediaManagement', {
    templateUrl: "/component/media-management/media-management.html",
    controller: function ($scope, $attrs, fileUploadFactory) {
        $scope.type = $attrs.type;
        if ($attrs.type === 'image') {

        }

        fileUploadFactory.getFileUploads()
            .then(function (res) {
                $scope.items = res.data.result;
            })
            .catch(function (err) {
                console.log(err);
            });

        $scope.uploadSingleFile = (data) => {
            fileUploadFactory.create(data.files[0])
              .then(function (res) {
                    $scope.items.push(res.data.result);
                })
              .catch(function (res) {
                    res.data.errors.forEach(err => alert(err.errorMessage));
                });
        }

        $scope.contentTypeStartsWith = (contentType, type) => contentType.startsWith(type);

        $scope.selectItem = function (item) {
            $scope.items.forEach(item => {
                item.isSelected = false;
                item.isTrash = false;
            });
            item.isSelected = !item.isSelected;
            item.isTrash = !item.isTrash;
            $scope.$parent.url = item.url;
            $scope.$parent.info = item.name + " is selected";
        };

        $scope.clearSelected = function () {
            $scope.$parent.url = null;
            $scope.$parent.info = "";
        };

        $scope.delete = (id) => {
            let check = confirm("Are you sure you want to delete?")
            if (check) {
                $scope.items.splice(id, 1);
                $scope.clearSelected();
            }
        }
    },
    bindings: {
        title: '<' // Thuộc tính tùy chỉnh 'title'
    }
});