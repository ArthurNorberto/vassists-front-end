'use strict';

(function () {

    function GerenciarUsuarioController($state, $cookies, UsuarioService) {
        var vm = this;

        vm.filtro = {
            Nome: '',
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

            vm.filtro = {
                Nome: '',
                CodigoPerfil: ''
            };

        };

    }

    angular.module('vassistsApp').controller('GerenciarUsuarioController', GerenciarUsuarioController);
})();