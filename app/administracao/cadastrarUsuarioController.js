'use strict';

(function () {

    function CadastrarUsuarioController($state, $cookies, UsuarioService) {
        var vm = this;

        vm.listaPerfil = [];

        vm.dados = {
            Nome: '',
            Email: '',
            CodigoPerfil: ''
        };

        vm.limpar = limpar;

        recuperarPerfil();

        function recuperarPerfil() {

            UsuarioService.listarPerfil().then(function () {

                vm.listaPerfil = UsuarioService.listaPerfil;

            }, function (resposta) {

            });

        };

        function limpar() {

            vm.dados = {
                Nome: '',
                Email: '',
                CodigoPerfil: ''
            };

        };
    }

    angular.module('vassistsApp').controller('CadastrarUsuarioController', CadastrarUsuarioController);
})();