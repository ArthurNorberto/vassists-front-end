'use strict';

(function () {

    function VisualizarPontoController($state, $cookies, $stateParams, NgTableParams, MensagemService, PainelService, PontosService, RespostasService) {
        var vm = this;
        var infoUsuario = $cookies.getObject('infoUsuario');

        var codigoPonto = $stateParams.parametro;
        vm.dadosIncluir = {
            CodigoUsuario: infoUsuario.Codigo,
            Texto: ''
        }


        vm.excluirPonto = excluirPonto;
        vm.inserirResposta = inserirResposta;


        recuperarPonto();
        recuperarRespostas();

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

        function recuperarRespostas() {

            RespostasService.listarRespostas(codigoPonto).then(function () {

                vm.listaResposta = RespostasService.listaRespostas;

            }, function (resposta) {


            });
        };

        function inserirResposta() {
            MensagemService.aviso(function (isConfirm) {
                //Duas opções vão aparecer: Sim e Não
                if (isConfirm) {

                    RespostasService.inserirResposta(codigoPonto, vm.dadosIncluir).then(function () {
                        recuperarRespostas();
                        toastr.success('Resposta Inserida com Sucesso!');
                        limpar();

                    }, function (resposta) {
                        vm.erro = resposta.data;
                    });

                } else {
                    //Aqui o usuário clicou em "Não"
                }

            });

        };

        function limpar() {


            vm.dadosIncluir = {
                CodigoUsuario: infoUsuario.Codigo,
                Texto: ''
            };
        };




    }

    angular.module('vassistsApp').controller('VisualizarPontoController', VisualizarPontoController);
})();