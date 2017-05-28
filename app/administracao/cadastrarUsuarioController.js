'use strict';

(function () {

    function CadastrarUsuarioController($state, $cookies, UsuarioService, PainelService) {
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

            PainelService.listarPerfil().then(function () {

                vm.listaPerfil = PainelService.listaPerfil;

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

        function cadastrarUsuario() {

            UsuarioService.cadastro(vm.dados).then(function () {

                toastr.success("Usuário Cadastrado com sucesso!");
                limpar();

            }, function (resposta) {

            });

        };
    }

    angular.module('vassistsApp').controller('CadastrarUsuarioController', CadastrarUsuarioController);
})();