adminApp.component('mediaManagement', {
    templateUrl: "components/media-management/media-management.html",
    controller: function($scope, $attrs) {
        $scope.type = $attrs.type;
        if ($attrs.type === 'image') {
            //https://localhost:8080/medias?type=image
            console.log($scope.$parent)
        }
    },
    bindings: {
        title: '<' // Thuộc tính tùy chỉnh 'title'
    }
});