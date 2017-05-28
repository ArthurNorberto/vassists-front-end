'use strict';

(function () {

    function AlterarSenhaController($state, $cookies, UsuarioService, MensagemService) {
        var vm = this;
        var infoUsuario = $cookies.getObject('infoUsuario');
        vm.dados = {
            SenhaAntiga: '',
            SenhaNova: '',
            SenhaNovaConfirme: ''
        }

        vm.alterarSenha = alterarSenha;
        vm.limparSenha = limparSenha;

        function alterarSenha() {

            MensagemService.aviso(function (isConfirm) {
                //Duas opções vão aparecer: Sim e Não
                if (isConfirm) {
                    //Aqui o usuário clicou em "Sim"

                    UsuarioService.alterarSenha(infoUsuario.Codigo, vm.dados).then(function () {

                        limparSenha();
                        toastr.success("Senha alterada com sucesso");

                    }, function (resposta) {

                    });


                } else {
                    //Aqui o usuário clicou em "Não"
                }
            });


        };


        function limparSenha() {

            vm.dados = {
                SenhaAntiga: '',
                SenhaNova: '',
                SenhaNovaConfirme: ''
            }

        };

    }

    angular.module('vassistsApp').controller('AlterarSenhaController', AlterarSenhaController);
})();