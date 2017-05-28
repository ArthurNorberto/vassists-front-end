'use strict';

(function () {

    function AlterarUsuarioController($state, $cookies, $stateParams, $http, UsuarioService, MensagemService) {
        var vm = this;

        var infoUsuario = $cookies.getObject('infoUsuario');
        var codigoUsuario = $stateParams.parametro;

        // Inicialização de variáveis



        // Funções executadas ao iniciar o controlador
        vm.listaPerfil = {};

        // Declaração de funções

        recuperarPerfil();
        recuperarUsuario();
        alterarUsuario();

        function recuperarPerfil() {

            UsuarioService.listarPerfil().then(function () {

                vm.listaPerfil = UsuarioService.listaPerfil;

            }, function (resposta) {

            });

        };

        function recuperarUsuario() {

            UsuarioService.recuperarUsuario(infoUsuario.Codigo).then(function () {

                vm.dados = UsuarioService.usuario;

            }, function (resposta) {

            });
        };

        function alterarUsuario() {

            UsuarioService.recuperarUsuario(infoUsuario.Codigo, vm.dados).then(function () {



            }, function (resposta) {

            });

        };




    }

    angular.module('vassistsApp').controller('AlterarUsuarioController', AlterarUsuarioController);
})();