'use strict';

(function () {

    function AlterarUsuarioController($state, $cookies, $stateParams, $http, UsuarioService, MensagemService, PainelService) {
        var vm = this;

        var infoUsuario = $cookies.getObject('infoUsuario');
        var codigoUsuario = $stateParams.parametro;

        // Inicialização de variáveis
        vm.listaPerfil = {};


        // Funções executadas ao iniciar o controlador

        vm.alterarUsuario = alterarUsuario;
        vm.limpar = limpar;

        // Declaração de funções

        recuperarPerfil();
        recuperarUsuario();


        function recuperarPerfil() {

            PainelService.listarPerfil().then(function () {

                vm.listaPerfil = PainelService.listaPerfil;

            }, function (resposta) {

            });

        };

        function recuperarUsuario() {

            UsuarioService.recuperarUsuario(codigoUsuario).then(function () {

                vm.dados = UsuarioService.usuario;

            }, function (resposta) {

            });
        };

        function alterarUsuario() {

            MensagemService.aviso(function (isConfirm) {
                //Duas opções vão aparecer: Sim e Não
                if (isConfirm) {
                    //Aqui o usuário clicou em "Sim"

                    UsuarioService.alterarUsuario(codigoUsuario, vm.dados).then(function () {

                        toastr.success("Usuário alterado com sucesso");


                    }, function (resposta) {

                    });


                } else {
                    //Aqui o usuário clicou em "Não"
                }
            });
        };

        function limpar() {

            recuperarUsuario();
        };


    }

    angular.module('vassistsApp').controller('AlterarUsuarioController', AlterarUsuarioController);
})();