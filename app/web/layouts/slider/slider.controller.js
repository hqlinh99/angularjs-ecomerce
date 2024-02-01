myApp.controller("sliderCtrl", ["$scope", "$timeout", function ($scope, $timeout) {
    $timeout(() => {
        var swiper = new Swiper(".mySwiper", {
            cssMode: true,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            pagination: {
                el: ".swiper-pagination",
            },
            mousewheel: true,
            keyboard: true,
        });
    })
}]);
