'use strict';

(function () {

    function CadastroController($state, $cookies, $http, UsuarioService, MensagemService) {
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

            UsuarioService.listarPerfilSemAdm().then(function () {

                vm.listaPerfil = UsuarioService.listaPerfil;

            }, function (resposta) {

            });

        };

        function cadastro() {

            UsuarioService.cadastro(vm.dados).then(function () {

                toastr.success("Cadastrado com sucesso");

                MensagemService.sucesso("Sucesso!", "Cadastro com sucesso. Favor usar a senha 123456.");

                $state.go("login");

            }, function (resposta) {

            });
        };

    }

    angular.module('vassistsApp').controller('CadastroController', CadastroController);
})();