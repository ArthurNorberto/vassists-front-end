'use strict';

(function () {

    function CadastrarPontosController($state, $cookies, ApiService, NgMap) {
        var vm = this;
        vm.googleMapsUrl = ApiService.urlGoogle;

        vm.center = "-25.363882, 131.044922";

        NgMap.getMap().then(function (map) {
            vm.map = map;
        });
        vm.placeMarker = function (e) {
            var marker = new google.maps.Marker({
                position: e.latLng,
                map: vm.map
            });
            vm.map.panTo(e.latLng);
        }


    }

    angular.module('vassistsApp').controller('CadastrarPontosController', CadastrarPontosController);
})();