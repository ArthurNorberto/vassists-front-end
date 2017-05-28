'use strict';

(function () {

    function MeusDadosController($state, $cookies, UsuarioService, PainelService) {
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

            MensagemService.aviso(function (isConfirm) {
                //Duas opções vão aparecer: Sim e Não
                if (isConfirm) {
                    //Aqui o usuário clicou em "Sim"

                    UsuarioService.alterarUsuario(infoUsuario.Codigo, vm.dados).then(function () {

                        toastr.success("Usuário alterado com sucesso");


                    }, function (resposta) {

                    });


                } else {
                    //Aqui o usuário clicou em "Não"
                }
            });


        };



    }

    angular.module('vassistsApp').controller('MeusDadosController', MeusDadosController);
})();