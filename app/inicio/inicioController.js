'use strict';

(function () {

    function InicioController($state, $cookies, MensagensService, PontosService, NgMap, NavigatorGeolocation, GeoCoder) {
        var vm = this;

        vm.listaMensagem = {};
        vm.listaTodosPontos = {};

        vm.positions = [];
        vm.tamanhoTotal = '';
        vm.current = 0;

        vm.center = [];

        vm.setPositions = setPositions;
        vm.proximo = proximo;
        vm.anterior = anterior;

        listaUltimasMensagens();

        listarTodosPontos();

        NgMap.getMap().then(function (map) {
            vm.map = map;
        });

        function listarTodosPontos() {

            PontosService.listarTodosPontos().then(function () {

                vm.listaTodosPontos = PontosService.listaTodosPontos;

                configurarPositions(vm.listaTodosPontos);
            }, function (resposta) {

            });

        };

        function configurarPositions(listaPontos) {

            var tamanho = listaPontos.length;

            vm.tamanhoTotal = tamanho;

            var aux = [];

            if (tamanho > 0) {
                vm.center = [listaPontos[0].Latitude, listaPontos[0].Longitude];
            }



            while (tamanho--) {

                aux = [];
                aux.pos = [listaPontos[tamanho].Latitude, listaPontos[tamanho].Longitude];

                aux.texto = listaPontos[tamanho].Observacao;
                aux.usuario = listaPontos[tamanho].NomeUsuario;
                aux.endereco = listaPontos[tamanho].EnderecoCompleto;

                vm.positions.push(aux);
            };

        };

        function setPositions(pos) {
            vm.positions = angular.copy(pos);
        };

        function listaUltimasMensagens() {

            MensagensService.listaUltimasMensagens().then(function () {

                vm.listaMensagem = MensagensService.listaMensagem;
            }, function (resposta) {

            });
        };

        function anterior() {

            if (vm.tamanhoTotal > 0) {

                vm.center = [vm.listaTodosPontos[vm.current].Latitude, vm.listaTodosPontos[vm.current].Longitude];

                vm.current--;

                if (vm.current < 0) {
                    vm.current = vm.tamanhoTotal;
                }
            }

        };

        function proximo() {

            if (vm.tamanhoTotal > 0) {

                vm.center = [vm.listaTodosPontos[vm.current].Latitude, vm.listaTodosPontos[vm.current].Longitude];

                vm.current++;

                if (vm.current == vm.tamanhoTotal) {
                    vm.current = 0;
                }

            }

        };

    }

    angular.module('vassistsApp').controller('InicioController', InicioController);
})();