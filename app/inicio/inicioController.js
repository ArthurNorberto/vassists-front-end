'use strict';

(function () {

    function InicioController($state, $cookies, MensagensService, PontosService, NgMap, NavigatorGeolocation, GeoCoder) {
        var vm = this;

        vm.listaMensagem = {};
        vm.listaTodosPontos = {};

        vm.positions = [];
        vm.tamanhoTotal = '';

        vm.setPositions = setPositions;

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

    }

    angular.module('vassistsApp').controller('InicioController', InicioController);
})();