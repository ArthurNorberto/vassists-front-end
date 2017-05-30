'use strict';

(function () {

    function CadastrarPontosController($scope, $state, $cookies, ApiService, NgMap, NavigatorGeolocation, GeoCoder, MensagemService, PontosService, PainelService) {
        var vm = this;
        var infoUsuario = $cookies.getObject('infoUsuario');
        vm.googleMapsUrl = ApiService.urlGoogle;


        vm.markers = [];

        vm.listaTipo = [];

        vm.dados = {
            CodigoUsuario: infoUsuario.Codigo,
            CodigoTipo: '',
            Observacao: '',
            Latitude: '',
            Longitude: '',
            Endereco: '',
            Estado: '',
            Cidade: '',
            Pais: ''
        };

        var estado = '';
        var cidade = '';
        var pais = '';

        vm.cadastrarPonto = cadastrarPonto;
        vm.limparCampos = limparCampos;


        var endereco = '';


        recuperarTipo();

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


            vm.dados.Latitude = parseFloat(vm.markers[0].getPosition().lat());
            vm.dados.Longitude = parseFloat(vm.markers[0].getPosition().lng());

            var pos = {
                lat: vm.dados.Latitude,
                lng: vm.dados.Longitude

            };

            recuperarEndereco(pos);
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

            if (vm.markers.length == 0) {

                MensagemService.informacao("É necessário clicar no mapa e escolher um ponto para registrar!");

                return;
            }

            MensagemService.aviso(function (isConfirm) {
                //Duas opções vão aparecer: Sim e Não
                if (isConfirm) {

                    vm.dados.Endereco = endereco;
                    vm.dados.Pais = pais;
                    vm.dados.Cidade = cidade;
                    vm.dados.Estado = estado;

                    PontosService.registrarPonto(vm.dados).then(function () {

                        toastr.success("Ponto Crítico registrado com sucesso!");
                        $state.go("app.meus-pontos");

                    }, function (resposta) {

                    });

                    clearMarkers();

                } else {
                    //Aqui o usuário clicou em "Não"
                }
            });

        };

        function limparCampos() {
            vm.dados = {
                CodigoUsuario: infoUsuario.Codigo,
                CodigoTipo: '',
                Observacao: '',
                Latitude: '',
                Longitude: '',
                Endereco: ''
            };
            vm.address = '';
            clearMarkers();
        };

        function recuperarTipo() {

            PainelService.listarTipos().then(function () {

                vm.listaTipo = PainelService.listaTipos;

            }, function (resposta) {

            });

        };


        function recuperarEndereco(position) {

            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({
                'latLng': new google.maps.LatLng(position.lat, position.lng)
            }, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    if (results[0]) {

                        endereco = results[0].formatted_address;
                        var result = results[0].address_components;
                        for (var i = 0; i < result.length; ++i) {
                            if (result[i].types[0] == "administrative_area_level_2") {
                                cidade = result[i].long_name;
                            }
                            if (result[i].types[0] == "administrative_area_level_1") {
                                estado = result[i].short_name;
                            }
                            if (result[i].types[0] == "country") {
                                pais = result[i].short_name;
                            }

                        }
                    } else {
                        alert('No results found');
                    }
                } else {
                    alert('Geocoder failed due to: ' + status);
                }
            });



        };




    }

    angular.module('vassistsApp').controller('CadastrarPontosController', CadastrarPontosController);
})();