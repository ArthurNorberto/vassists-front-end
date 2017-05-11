'use strict';

(function () {

    function MeusDadosController($state, $cookies, UsuarioService) {
        var vm = this;

        vm.dados = {};
        vm.listaPerfil = {};

        vm.alterarSenha = alterarSenha;
        vm.limpar = limpar;

        recuperarUsuario();
        recuperarPerfil();


        function alterarSenha() {

            $state.go("app.alterar-senha");

        };

        function recuperarUsuario() {

            UsuarioService.recuperarUsuario().then(function () {

                vm.dados = UsuarioService.usuario;

            }, function (resposta) {

            });
        };


        function recuperarPerfil() {

            UsuarioService.listarPerfil().then(function () {

                vm.listaPerfil = UsuarioService.listaPerfil;

            }, function (resposta) {

            });

        };

        function limpar() {

            recuperarUsuario();

        };



    }

    angular.module('vassistsApp').controller('MeusDadosController', MeusDadosController);
})();