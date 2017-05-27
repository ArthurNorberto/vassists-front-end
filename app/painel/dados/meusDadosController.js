'use strict';

(function () {

    function MeusDadosController($state, $cookies, UsuarioService) {
        var vm = this;
        var infoUsuario = $cookies.getObject('infoUsuario');

        vm.dados = {};

        vm.alterarSenha = alterarSenha;
        vm.limpar = limpar;
        vm.alterarUsuario = alterarUsuario;

        recuperarUsuario();

        function alterarSenha() {

            $state.go("app.alterar-senha");

        };

        function recuperarUsuario() {

            UsuarioService.recuperarUsuario(infoUsuario.Codigo).then(function () {

                vm.dados = UsuarioService.usuario;

            }, function (resposta) {

            });
        };


        function limpar() {

            recuperarUsuario();

        };

        function alterarUsuario() {

            UsuarioService.recuperarUsuario(infoUsuario.Codigo, vm.dados).then(function () {



            }, function (resposta) {

            });

        };



    }

    angular.module('vassistsApp').controller('MeusDadosController', MeusDadosController);
})();