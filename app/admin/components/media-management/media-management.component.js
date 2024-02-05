adminApp.component('mediaManagement', {
    templateUrl: "components/media-management/media-management.html",
    controller: function ($scope, $attrs) {
        $scope.type = $attrs.type;
        if ($attrs.type === 'image') {

        }

        $scope.items = [
            {
                id: 1,
                name: '1701878932176351232/AlNU3WTK_400x400.jpg',
                url: "https://pbs.twimg.com/profile_images/1701878932176351232/AlNU3WTK_400x400.jpg",
                type: "image"
            }, {
                id: 2,
                name: '1701878932176351232/AlNU3WTK_400x400.jpg',
                url: "https://pbs.twimg.com/profile_images/1701878932176351232/AlNU3WTK_400x400.jpg",
                type: "image"
            }, {
                id: 3,
                name: '1701878932176351232/AlNU3WTK_400x400.jpg',
                url: "https://pbs.twimg.com/profile_images/1701878932176351232/AlNU3WTK_400x400.jpg",
                type: "image"
            }, {
                id: 4,
                name: '1701878932176351232/AlNU3WTK_400x400.jpg',
                url: "https://pbs.twimg.com/profile_images/1701878932176351232/AlNU3WTK_400x400.jpg",
                type: "image"
            },
            // ...
        ];

        $scope.selectItem = function (item) {
            $scope.items.forEach(item => {
                item.isSelected = false;
                item.isTrash = false;
            });
            item.isSelected = !item.isSelected;
            item.isTrash = !item.isTrash;
            $scope.url = item.url;
            $scope.info = item.name + " is selected";
        };

        $scope.delete = (id) => {
            let check = confirm("Are you sure you want to delete?")
            if (check)
            {
                $scope.items.splice(id, 1);
                $scope.clearSelected();
            }
        }
    },
    bindings: {
        title: '<' // Thuộc tính tùy chỉnh 'title'
    }
});