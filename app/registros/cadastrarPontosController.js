'use strict';

(function () {

    function CadastrarPontosController($scope, $state, $cookies, ApiService, NgMap, NavigatorGeolocation, GeoCoder, MensagemService) {
        var vm = this;
        vm.googleMapsUrl = ApiService.urlGoogle;

        vm.center = "-25.363882, 131.044922";


        vm.cadastrarPonto = cadastrarPonto;

        //used for setting bounds of google map display

        NgMap.getMap().then(function (map) {
            vm.map = map;

        });

        vm.placeChanged = function () {
            vm.place = this.getPlace();
            console.log('location', vm.place.geometry.location);
            vm.map.setCenter(vm.place.geometry.location);
        };


        vm.placeMarker = function (e) {

            var marker = new google.maps.Marker({
                position: e.latLng,
                map: vm.map
            });
            vm.map.panTo(e.latLng);
        };

        function cadastrarPonto() {

            MensagemService.aviso(function (isConfirm) {
                //Duas opções vão aparecer: Sim e Não
                if (isConfirm) {





                } else {
                    //Aqui o usuário clicou em "Não"
                }
            });

        };




    }

    angular.module('vassistsApp').controller('CadastrarPontosController', CadastrarPontosController);
})();