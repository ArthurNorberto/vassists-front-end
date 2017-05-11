'use strict';

(function () {

    function CadastrarPontosController($scope, $state, $cookies, ApiService, NgMap, NavigatorGeolocation, GeoCoder, MensagemService, PontosService) {
        var vm = this;
        vm.googleMapsUrl = ApiService.urlGoogle;

        vm.center = "-25.363882, 131.044922";
        vm.markers = [];

        vm.listaProblemas = [];

        vm.cadastrarPonto = cadastrarPonto;

        vm.dados = {};

        listarTipos();

        //used for setting bounds of google map display

        NgMap.getMap().then(function (map) {
            vm.map = map;

        }).then(iniciar);


        vm.placeChanged = function () {
            vm.place = this.getPlace();
            console.log('location', vm.place.geometry.location);
            vm.map.setCenter(vm.place.geometry.location);
        };


        vm.placeMarker = function (e) {

            createAndPlaceMarker(e.latLng);

        };

        function createMarker(position) {
            return new google.maps.Marker({
                position: position,
                map: vm.map
            });
        };

        function createAndPlaceMarker(position) {

            clearMarkers();
            var marker = createMarker(position);
            vm.markers.push(marker);

        };

        function iniciar() {

            if (/Mobi/.test(navigator.userAgent)) {
                // mobile!
                var infoWindow = new google.maps.InfoWindow({
                    map: vm.map
                });

                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        var pos = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };

                        vm.map.setCenter(pos);

                        createAndPlaceMarker(pos);

                    }, function () {
                        handleLocationError(true, infoWindow, map.getCenter());
                    });
                }


            } else {


            }

        };

        function clearMarkers() {

            var i = vm.markers.length;

            while (i--) {

                vm.markers[i].setMap(null);

            }

            vm.markers.length = 0;

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


        function listarTipos() {

            PontosService.listarTipos().then(function () {

                vm.listaProblemas = PontosService.listaTipos;

            }, function (resposta) {


            });

        };



    }

    angular.module('vassistsApp').controller('CadastrarPontosController', CadastrarPontosController);
})();