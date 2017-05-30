'use strict';

(function () {

    function InicioController($state, $cookies, MensagensService) {
        var vm = this;

        vm.listaMensagem = {};

        listaUltimasMensagens();

        function listaUltimasMensagens() {

            MensagensService.listaUltimasMensagens().then(function () {

                vm.listaMensagem = MensagensService.listaMensagem;
            }, function (resposta) {

            });
        };

    }

    angular.module('vassistsApp').controller('InicioController', InicioController);
})();