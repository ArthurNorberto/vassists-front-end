'use strict';

(function () {

    function VisualizarPontoController($state, $cookies, $stateParams, NgTableParams, MensagemService, PainelService, PontosService) {
        var vm = this;
        var infoUsuario = $cookies.getObject('infoUsuario');

        var codigoPonto = $stateParams.parametro;

        vm.excluirPonto = excluirPonto;

        recuperarPonto();

        function recuperarPonto() {

            PontosService.recuperarPonto(codigoPonto).then(function () {

                vm.dados = PontosService.dados;

            }, function (resposta) {

            });
        };

        function excluirPonto() {

            MensagemService.aviso(function (isConfirm) {
                //Duas opções vão aparecer: Sim e Não
                if (isConfirm) {

                    PontosService.excluir(codigoPonto).then(function () {

                        toastr.success('Ponto excluído com sucesso');
                        $state.go('app.meus-pontos');


                    }, function (resposta) {
                        vm.erro = resposta.data;
                    });

                } else {
                    //Aqui o usuário clicou em "Não"
                }

            });
        };



    }

    angular.module('vassistsApp').controller('VisualizarPontoController', VisualizarPontoController);
})();