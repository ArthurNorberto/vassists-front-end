'use strict';

(function () {

    function CadastroController($state, $cookies, $http, UsuarioService) {
        var vm = this;

        vm.dados = {};
        vm.listaPerfil = {};

        // Inicialização de variáveis
        vm.voltar = voltar;
        vm.cadastro = cadastro;

        recuperarPerfil();

        function voltar() {

            $state.go("login");

        };

        function recuperarPerfil() {

            UsuarioService.listarPerfil().then(function () {

                vm.listaPerfil = UsuarioService.listaPerfil;

            }, function (resposta) {

            });

        };

        function cadastro() {

            UsuarioService.cadastro(vm.dados).then(function () {

                toastr.success("Cadastrado com sucesso");
                $state.go("login");

            }, function (resposta) {

            });
        };

    }

    angular.module('vassistsApp').controller('CadastroController', CadastroController);
})();